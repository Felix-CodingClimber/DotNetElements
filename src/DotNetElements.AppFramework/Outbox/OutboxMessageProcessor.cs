namespace DotNetElements.AppFramework.Outbox;

public interface IOutboxMessageProcessor
{
	Task<ResultWithError> ProcessAsync(object message, CancellationToken cancellation);
}

public abstract class OutboxMessageProcessor<T> : IOutboxMessageProcessor
{
	public Task<ResultWithError> ProcessAsync(object message, CancellationToken cancellation)
	{
		if (message is not T typedMessage)
			throw new ArgumentException($"Invalid message type: {message.GetType().Name}. Expected: {typeof(T).Name}.");

		return ProcessAsync(typedMessage, cancellation);
	}

	protected abstract Task<ResultWithError> ProcessAsync(T message, CancellationToken cancellation);
}
