namespace DotNetElements.AppFramework;

public interface IOutboxMessageProcessor
{
	Task<ResultWithError> ProcessAsync(object message, CancellationToken cancellation);
}

public abstract class OutboxMessageProcessor<T> : IOutboxMessageProcessor
{
	public Task<ResultWithError> ProcessAsync(object message, CancellationToken cancellation)
	{
		if (message is not T tMessage)
			throw new ArgumentException("Invalid message type");

		return ProcessAsync(tMessage, cancellation);
	}

	protected abstract Task<ResultWithError> ProcessAsync(T message, CancellationToken cancellation);
}
