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
                options.BaseAddress = new Uri("https://raw.githubusercontent.com/FortAwesome/Font-Awesome/d3a7818c253fcbafff9ebd1d4abb2866c192e1d7/");
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

