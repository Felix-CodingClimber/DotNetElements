using DotNetElements.AppFramework.Outbox;
using Microsoft.AspNetCore.Builder;

namespace DotNetElements.AppFramework.AspNet.Outbox;

public static class WebApplicationBuilderExtensions
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
