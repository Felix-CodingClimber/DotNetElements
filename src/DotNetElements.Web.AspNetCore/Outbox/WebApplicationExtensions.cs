using Microsoft.AspNetCore.Builder;

namespace DotNetElements.Web;

public static class WebApplicationExtensions
{
	public static WebApplication MapOutboxTest(this WebApplication app)
	{
		app.MapGet("/api/outbox/testRun", async (IOutboxService outboxService) =>
		{
			await outboxService.RunAsync(CancellationToken.None);
		});

		return app;
	}
}
