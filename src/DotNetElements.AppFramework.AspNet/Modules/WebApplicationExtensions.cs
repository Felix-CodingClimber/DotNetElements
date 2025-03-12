using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace DotNetElements.AppFramework.AspNet.Modules;

public static class WebApplicationExtensions
{
    public static WebApplication MapModuleEndpoints(this WebApplication app)
    {
        ArgumentNullException.ThrowIfNull(WebApplicationBuilderExtensions.RegisteredModules);

        foreach (IModule module in WebApplicationBuilderExtensions.RegisteredModules)
            module.MapEndpoints(app);

        return app;
    }

    public static WebApplication MigrateDatabase<TDbContext>(this WebApplication app)
        where TDbContext : DbContext
    {
        using IServiceScope migrationScope = app.Services.CreateScope();

        IDatabaseMigrationService<TDbContext>? migrationService = migrationScope.ServiceProvider.GetService<IDatabaseMigrationService<TDbContext>>();

        ArgumentNullException.ThrowIfNull(migrationService);

        migrationService.Migrate();

        return app;
    }
}
