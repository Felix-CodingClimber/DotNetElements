namespace BlazorCrud.Core;

public interface IScopedRepositoryFactory<TRepository, TEntity, TEditModel, TKey>
    where TEntity : Entity<TKey>, IUpdatableFromModel<TEditModel>
    where TKey : notnull
	where TRepository : IRepository<TEntity, TEditModel, TKey>
{
	ScopedRepository<TRepository, TEntity, TEditModel, TKey> Create();
}