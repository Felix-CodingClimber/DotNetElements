using Microsoft.Extensions.DependencyInjection;

namespace DotNetElements.AppFramework;

public static partial class ServiceCollectionExtensions
{
    public static IServiceCollection AddAppFrameworkDbContext<TDbContext>(this IServiceCollection services, Action<FrameworkDbContextOptions>? configureOptions = null)
        where TDbContext : DbContext
    {
        FrameworkDbContextOptions userOptions = new();
        configureOptions?.Invoke(userOptions);

        services.AddDbContext<TDbContext>((provider, options) =>
        {
            if (userOptions.UseEntityAudit)
                options.AddInterceptors(provider.GetRequiredService<AuditInterceptor>());
        });

        if (userOptions.UseEntityAudit)
            services.AddScoped<AuditInterceptor>();

        return services;
    }

    public static IServiceCollection AddModuleService<TService, TDbContext>(this IServiceCollection services)
        where TService : ModuleService<TDbContext>
        where TDbContext : DbContext
    {
        services.AddScoped<TService>();

        return services;
    }
}
