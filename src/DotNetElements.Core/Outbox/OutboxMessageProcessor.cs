namespace DotNetElements.Core;

public interface IOutboxMessageProcessor
{
	Task<Result> ProcessAsync(object message, CancellationToken cancellation);
}

public abstract class OutboxMessageProcessor<T> : IOutboxMessageProcessor
{
	public Task<Result> ProcessAsync(object message, CancellationToken cancellation)
	{
		if (message is not T tMessage)
			throw new ArgumentException("Invalid message type");

		return ProcessAsync(tMessage, cancellation);
	}

	protected abstract Task<Result> ProcessAsync(T message, CancellationToken cancellation);
}
