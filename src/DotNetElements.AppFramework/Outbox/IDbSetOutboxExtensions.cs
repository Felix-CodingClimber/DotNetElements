using System.Text.Json;
using DotNetElements.AppFramework.Abstractions.Outbox;

namespace DotNetElements.AppFramework.Outbox;

public static class IDbSetOutboxExtensions
{
	public static void AddMessage<T>(this IDbSetOutbox dbSetOutbox, T message)
	{
		OutboxMessage outboxMessage = new()
		{
			Id = Guid.NewGuid(),
			OccurredOnUtc = DateTime.UtcNow,
			Type = typeof(T).FullName ?? throw new Exception("Type name is null"),
			Content = JsonSerializer.Serialize(message)
		};

		dbSetOutbox.OutboxMessages.Add(outboxMessage);
	}
}
