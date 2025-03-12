using Microsoft.Extensions.DependencyInjection;

namespace DotNetElements.AppFramework;

public static partial class ServiceCollectionExtensions
{
    public static IServiceCollection AddAppFrameworkBase(this IServiceCollection services)
    {
        services.AddSingleton<TimeProvider>(TimeProvider.System);

        return services;
    }
}
