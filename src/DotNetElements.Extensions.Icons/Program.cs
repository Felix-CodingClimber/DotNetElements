using DotNetElements.Extensions.Icons;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

IHostBuilder builder = CreateHostBuilder();
using IHost host = builder.Build();
await host.RunAsync();

static IHostBuilder CreateHostBuilder()
{
    return Host.CreateDefaultBuilder()
        .ConfigureLogging(logging =>
        {
            // Configure logging
        })
        .ConfigureServices(services =>
        {
            // Register services
            services.AddHostedService<ConsoleApplication>();
            services.AddLogging(builder => builder.AddConsole());
            services.AddHttpClient<FontAwesomeSvgGenerator>(options =>
            {
                options.BaseAddress = new Uri("https://raw.githubusercontent.com/FortAwesome/Font-Awesome/refs/heads/7.x/");
            });
            services.AddHttpClient<MaterialIconsSvgGenerator>(options =>
            {
                options.DefaultRequestHeaders.Add("User-Agent", "request");
            });
            services.AddHttpClient<MaterialIconsFontGenerator>(options =>
            {
                options.DefaultRequestHeaders.Add("User-Agent", "request");
            });
            services.AddHttpClient<CodiconsFontGenerator>(options =>
            {
                options.DefaultRequestHeaders.Add("User-Agent", "request");
            });
        });
}

