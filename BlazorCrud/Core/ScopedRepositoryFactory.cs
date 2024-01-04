namespace BlazorCrud.Core;

public sealed class ScopedRepositoryFactory<TRepository, TEntity, TKey> : IScopedRepositoryFactory<TRepository, TEntity, TKey>
	where TEntity : Entity<TKey>
	where TKey : notnull
	where TRepository : IRepository<TEntity, TKey>
{
	private readonly IServiceProvider serviceProvider;

	public ScopedRepositoryFactory(IServiceProvider serviceProvider)
	{
		this.serviceProvider = serviceProvider;
	}

	public ScopedRepository<TRepository, TEntity, TKey> Create()
	{
		IServiceScope scope = serviceProvider.CreateScope();

		TRepository repository = scope.ServiceProvider.GetRequiredService<TRepository>();

		ScopedRepository<TRepository, TEntity, TKey> scopedRepository = new(scope, repository);

		return scopedRepository;
	}
}
