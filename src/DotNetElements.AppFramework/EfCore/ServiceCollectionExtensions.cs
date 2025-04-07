using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace DotNetElements.AppFramework;

public static partial class ServiceCollectionExtensions
{
    public static IServiceCollection AddAppFrameworkDbContext<TDbContext>(this IServiceCollection services,
        Action<FrameworkDbContextOptions>? configureOptions = null,
        Action<IServiceProvider, DbContextOptionsBuilder>? dbContextOptionsAction = null)
        where TDbContext : DbContext
    {
        FrameworkDbContextOptions userOptions = new();
        configureOptions?.Invoke(userOptions);

        services.AddDbContext<TDbContext>((provider, options) =>
        {
            if (userOptions.UseEntityAudit)
                options.AddInterceptors(provider.GetRequiredService<AuditInterceptor>());

            dbContextOptionsAction?.Invoke(provider, options);
        });

        if (userOptions.UseEntityAudit)
            services.TryAddScoped<AuditInterceptor>();

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
