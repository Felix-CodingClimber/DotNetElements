using NCronJob;

namespace DotNetElements.AppFramework.Outbox;

public sealed class OutboxServiceJob : IJob
{
	private readonly IOutboxService outboxService;

	public OutboxServiceJob(IOutboxService outboxService)
	{
		this.outboxService = outboxService;
	}

	public async Task RunAsync(IJobExecutionContext context, CancellationToken cancellation)
	{
		await outboxService.RunAsync(cancellation);
	}
}