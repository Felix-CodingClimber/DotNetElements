using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace DotNetElements.Extensions.Hosting.Settings;

public static class WebApplicationBuilderExtensions
{
    public static IHostApplicationBuilder AddSettings<T>(this IHostApplicationBuilder builder)
        where T : class, ISettings
    {
        string sectionName = T.ConfigurationSectionName;

        ArgumentNullException.ThrowIfNull(sectionName);

        builder.Services.AddOptions<T>()
                        .Bind(builder.Configuration.GetSection(sectionName))
                        .ValidateDataAnnotations()
                        .ValidateOnStart();

        return builder;
    }
}
