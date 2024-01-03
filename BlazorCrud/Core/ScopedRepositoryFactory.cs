namespace BlazorCrud.Core;

public sealed class ScopedRepositoryFactory<TRepository, TEntity, TEditModel, TKey> : IScopedRepositoryFactory<TRepository, TEntity, TEditModel, TKey>
	where TEntity : Entity<TKey>, IUpdatableFromModel<TEditModel>
	where TKey : notnull
	where TRepository : IRepository<TEntity, TEditModel, TKey>
{
	private readonly IServiceProvider serviceProvider;

	public ScopedRepositoryFactory(IServiceProvider serviceProvider)
	{
		this.serviceProvider = serviceProvider;
	}

	public ScopedRepository<TRepository, TEntity, TEditModel, TKey> Create()
	{
		IServiceScope scope = serviceProvider.CreateScope();

		TRepository repository = scope.ServiceProvider.GetRequiredService<TRepository>();

		var scopedRepository = new ScopedRepository<TRepository, TEntity, TEditModel, TKey>(scope, repository);

		return scopedRepository;
	}
}
