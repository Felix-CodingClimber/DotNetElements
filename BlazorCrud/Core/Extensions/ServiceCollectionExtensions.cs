namespace BlazorCrud.Core.Extensions;

public static class ServiceCollectionExtensions
{
	private static readonly List<IModule> registeredModules = new List<IModule>();

	public static IServiceCollection RegisterModules(this IServiceCollection services)
	{
		IEnumerable<IModule> modules = DiscoverModules();

		foreach (IModule module in modules)
		{
			module.RegisterModules(services);
			registeredModules.Add(module);
		}

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

	public static WebApplication MapEndpoints(this WebApplication app)
	{
		foreach (IModule module in registeredModules)
			module.MapEndpoints(app);

		return app;
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
