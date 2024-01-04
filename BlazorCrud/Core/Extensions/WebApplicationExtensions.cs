namespace BlazorCrud.Core.Extensions;

public static class WebApplicationExtensions
{
	public static WebApplication MapEndpoints(this WebApplication app)
	{
		ArgumentNullException.ThrowIfNull(ServiceCollectionExtensions.RegisteredModules);

		foreach (IModule module in ServiceCollectionExtensions.RegisteredModules)
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
