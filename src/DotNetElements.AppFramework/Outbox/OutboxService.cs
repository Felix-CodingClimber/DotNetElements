using DotNetElements.AppFramework.Abstractions.Outbox;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace DotNetElements.AppFramework.Outbox;

public interface IOutboxService
{
	Task RunAsync(CancellationToken cancellation);
}

public sealed class OutboxService<TDbContext> : IOutboxService
	where TDbContext : DbContext, IDbSetOutbox
{
	private readonly TDbContext dbContext;
	private readonly TimeProvider timeProvider;
	private readonly IServiceScopeFactory serviceScopeFactory;
	private readonly OutboxOptions outboxOptions;
	private readonly ILogger<OutboxService<TDbContext>> logger;

	private readonly JsonSerializerOptions jsonOptions = new()
	{
		UnmappedMemberHandling = JsonUnmappedMemberHandling.Disallow,
		PropertyNameCaseInsensitive = true
	};


	public OutboxService(
		TDbContext dbContext,
		TimeProvider timeProvider,
		IServiceScopeFactory serviceScopeFactory,
		IOptions<OutboxOptions> outboxOptions,
		ILogger<OutboxService<TDbContext>> logger)
	{
		this.dbContext = dbContext;
		this.timeProvider = timeProvider;
		this.serviceScopeFactory = serviceScopeFactory;
		this.outboxOptions = outboxOptions.Value;
		this.logger = logger;

		ArgumentNullException.ThrowIfNull(outboxOptions.Value.MessagesAssembly);
	}

	public async Task RunAsync(CancellationToken cancellation)
	{
		IReadOnlyList<OutboxMessage> messages = await GetPendingMessages(cancellation);

		logger.LogInformation("Started processing {MessageCount} messages", messages.Count);

		foreach (var messagesByType in messages.GroupBy(m => m.Type))
		{
			if (cancellation.IsCancellationRequested)
			{
				logger.LogWarning("Processing was cancelled");
				break;
			}

			logger.LogInformation("Started processing {MessageCount} messages of type {MessageType}", messagesByType.Count(), messagesByType.Key);

			Type? messageType = outboxOptions.MessagesAssembly!.GetType(messagesByType.Key);

			if (messageType is null)
			{
				logger.LogError("Failed to process messages. Unknown message type {MessageType}", messagesByType.Key);
				continue;
			}

			using IServiceScope serviceScope = serviceScopeFactory.CreateScope();

			Type processorType = typeof(OutboxMessageProcessor<>).MakeGenericType(messageType);
			IOutboxMessageProcessor? messageProcessor = serviceScope.ServiceProvider.GetService(processorType) as IOutboxMessageProcessor;

			if (messageProcessor is null)
			{
				logger.LogError("Failed to process messages. No message processor registered for message type {MessageType}", messagesByType.Key);
				continue;
			}

			foreach (OutboxMessage message in messagesByType)
			{
				if (cancellation.IsCancellationRequested)
				{
					logger.LogWarning("Processing was cancelled");
					break;
				}

				try
				{
					object? deserializedMessage = JsonSerializer.Deserialize(message.Content, messageType, jsonOptions);

					if (deserializedMessage is null)
					{
						logger.LogError("Failed to process message {MessageId} of type {MessageType}. Failed to read content", message.Id, message.Type);
						continue;
					}

					ResultWithError processMessageResult = await messageProcessor.ProcessAsync(deserializedMessage, cancellation);

					if (processMessageResult.HasError(out string? error))
					{
						logger.LogError("Failed to process message {MessageId} of type {MessageType}. Error: {Error}", message.Id, message.Type, error);

						await HandleFailedMessage(message, error);
						continue;
					}

					bool updateSuccess = await UpdateMessageStatus(message, processedOnUtc: timeProvider.GetUtcNow());

					if (!updateSuccess)
						await HandleFailedMessage(message, "Failed to update message status");
				}
				catch (Exception ex)
				{
					logger.LogError(
						ex,
						"Failed to process message {MessageId} of type {MessageType}. RetryCount: {Retries}",
						message.Id,
						message.Type,
						message.RetryCount);

					await HandleFailedMessage(message, ex.Message);
				}
			}

			logger.LogInformation("Finished processing messages of type {MessageType}", messagesByType.Key);
		}

		logger.LogInformation("Finished processing messages");
	}

	private async Task<IReadOnlyList<OutboxMessage>> GetPendingMessages(CancellationToken cancellation)
	{
		try
		{
			return await dbContext.OutboxMessages
				.Where(m => m.ProcessedOnUtc == null)
				.OrderBy(m => m.OccurredOnUtc)
				.ToListAsync(cancellation);
		}
		catch (Exception ex)
		{
			logger.LogError(ex, "Failed to query pending messages");

			return [];
		}
	}

	private async Task HandleFailedMessage(OutboxMessage message, string error)
	{
		if (message.RetryCount < outboxOptions.MaxRetryCount)
		{
			bool updateSuccess = await UpdateMessageStatus(message, error: error, retryCount: message.RetryCount + 1);

			// todo check what to do if update fails here
		}
		else
		{
			logger.LogError("Failed to process message {MessageId} of type {MessageType}. Error: Max retry count reached", message.Id, message.Type);

			bool updateSuccess = await UpdateMessageStatus(message, processedOnUtc: timeProvider.GetUtcNow(), error: error, retryCount: message.RetryCount);

			// todo check what to do if update fails here
		}
	}

	private async Task<bool> UpdateMessageStatus(OutboxMessage message, DateTimeOffset? processedOnUtc = null, string? error = null, int? retryCount = null)
	{
		if (processedOnUtc is not null)
			message.ProcessedOnUtc = processedOnUtc.Value;

		if (error is not null)
			message.Error = error;

		if (retryCount is not null)
			message.RetryCount = retryCount.Value;

		int numRowsUpdated = await dbContext.SaveChangesAsync();

		bool success = numRowsUpdated == 1;

		if (!success)
			logger.LogError("Failed to update message {MessageId} of type {MessageType}. Error: Failed to update message status", message.Id, message.Type);

		return success;
	}
}