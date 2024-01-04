namespace BlazorCrud.Core.Extensions;

public static class ServiceCollectionExtensions
{
	public static IReadOnlyList<IModule>? RegisteredModules { get; private set; }

	public static IServiceCollection RegisterModules(this IServiceCollection services)
	{
		IEnumerable<IModule> modules = DiscoverModules();
		List<IModule> registeredModules = new List<IModule>();

		foreach (IModule module in modules)
		{
			module.RegisterModules(services);
			registeredModules.Add(module);
		}

		RegisteredModules = registeredModules;

		return services;
	}

	public static IServiceCollection AddManagedRepository<TManagedRepository, TRepository, TEntity, TEditModel, TKey>(this IServiceCollection services)
		where TEntity : Entity<TKey>, IUpdatableFromModel<TEditModel>
		where TKey : notnull
		where TRepository : IRepository<TEntity, TEditModel, TKey>
		where TManagedRepository : ManagedRepository<TRepository, TEntity, TEditModel, TKey>
	{
		services.AddTransient<IScopedRepositoryFactory<TRepository, TEntity, TEditModel, TKey>, ScopedRepositoryFactory<TRepository, TEntity, TEditModel, TKey>>();
		services.AddTransient<TManagedRepository>();

		return services;
	}

	public static IServiceCollection AddDatabaseMigrationService<TDbContext>(this IServiceCollection services)
	where TDbContext : DbContext
	{
		services.AddScoped<IDatabaseMigrationService<TDbContext>, DatabaseMigrationService<TDbContext>>();

		return services;
	}

	// todo replace with source generated version
	private static IEnumerable<IModule> DiscoverModules()
	{
		return typeof(IModule).Assembly
		.GetTypes()
			.Where(p => p.IsAssignableTo(typeof(IModule)) && p.IsClass && !p.IsAbstract)
			.Select(Activator.CreateInstance)
			.Cast<IModule>();
	}
}
