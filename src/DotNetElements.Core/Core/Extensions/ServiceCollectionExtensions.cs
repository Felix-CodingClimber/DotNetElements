using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace DotNetElements.Core.Extensions;

public static class ServiceCollectionExtensions
{
	public static IServiceCollection AddManagedRepository<TManagedRepository, TRepository, TEntity, TKey>(this IServiceCollection services)
		where TEntity : Entity<TKey>
		where TKey : notnull, IEquatable<TKey>
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
}
