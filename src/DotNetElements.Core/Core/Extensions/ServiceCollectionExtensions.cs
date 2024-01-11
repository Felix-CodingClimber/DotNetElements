using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace DotNetElements.Core.Extensions;

public static class ServiceCollectionExtensions
{
	public static IReadOnlyList<IModule>? RegisteredModules { get; private set; }

	public static IServiceCollection RegisterModules(this IServiceCollection services, Assembly moduleAssembly)
	{
		IEnumerable<IModule> modules = DiscoverModules(moduleAssembly);
		List<IModule> registeredModules = [];

		foreach (IModule module in modules)
		{
			module.RegisterModules(services);
			registeredModules.Add(module);
		}

		RegisteredModules = registeredModules;

		return services;
	}

	public static IServiceCollection AddManagedRepository<TManagedRepository, TRepository, TEntity, TKey>(this IServiceCollection services)
		where TEntity : Entity<TKey>
		where TKey : notnull
		where TRepository : IRepository<TEntity, TKey>
		where TManagedRepository : ManagedRepository<TRepository, TEntity, TKey>
	{
		services.AddTransient<IScopedRepositoryFactory<TRepository, TEntity, TKey>, ScopedRepositoryFactory<TRepository, TEntity, TKey>>();
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
	private static IEnumerable<IModule> DiscoverModules(Assembly moduleAssembly)
	{
		return moduleAssembly.GetTypes()
			.Where(p => p.IsAssignableTo(typeof(IModule)) && p.IsClass && !p.IsAbstract)
			.Select(Activator.CreateInstance)
			.Cast<IModule>();
	}
}
