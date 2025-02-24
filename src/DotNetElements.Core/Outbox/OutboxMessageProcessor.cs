namespace DotNetElements.Core;

public interface IOutboxMessageProcessor
{
	Task<Result> ProcessAsync(object message);
}

public abstract class OutboxMessageProcessor<T> : IOutboxMessageProcessor
{
	public Task<Result> ProcessAsync(object message)
	{
		if (message is not T tMessage)
			throw new ArgumentException("Invalid message type");

		return ProcessAsync(tMessage);
	}

	protected abstract Task<Result> ProcessAsync(T message);
}
