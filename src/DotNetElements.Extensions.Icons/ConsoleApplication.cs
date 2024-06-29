using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace DotNetElements.Extensions.Icons;

internal sealed class ConsoleApplication : IHostedService
{
    private readonly ILogger logger;
    private readonly FontAwesomeSvgGenerator fontAwesomeSvgGenerator;
    private readonly MaterialIconsSvgGenerator materialIconsSvgGenerator;

    public ConsoleApplication(
        ILogger<ConsoleApplication> logger,
        IHostApplicationLifetime appLifetime,
        FontAwesomeSvgGenerator fontAwesomeSvgGenerator,
		MaterialIconsSvgGenerator materialIconsSvgGenerator)
    {
        this.logger = logger;
        this.fontAwesomeSvgGenerator = fontAwesomeSvgGenerator;
        this.materialIconsSvgGenerator = materialIconsSvgGenerator;

        appLifetime.ApplicationStarted.Register(OnStarted);
        appLifetime.ApplicationStopping.Register(OnStopping);
        appLifetime.ApplicationStopped.Register(OnStopped);
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        logger.LogInformation("Starting...");


        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        logger.LogInformation("Stopping...");
        return Task.CompletedTask;
    }

    private async void OnStarted()
    {
        logger.LogInformation("Application started.");

        await fontAwesomeSvgGenerator.Run();
        await materialIconsSvgGenerator.Run();
    }

    private void OnStopping()
    {
        logger.LogInformation("Application stopping.");
    }

    private void OnStopped()
    {
        logger.LogInformation("Application stoped.");
    }
}
