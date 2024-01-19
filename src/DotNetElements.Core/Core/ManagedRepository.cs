using System.Linq.Expressions;

namespace DotNetElements.Core;

public abstract class ManagedRepository<TRepository, TEntity, TKey> : ManagedReadOnlyRepository<TRepository, TEntity, TKey>, IRepository<TEntity, TKey>
	where TEntity : Entity<TKey>
	where TKey : notnull, IEquatable<TKey>
	where TRepository : IRepository<TEntity, TKey>
{
	public ManagedRepository(IScopedRepositoryFactory<TRepository, TEntity, TKey> repositoryFactory) : base(repositoryFactory)
	{
	}

	public Task<CrudResult<TEntity>> CreateAsync(TEntity entity, Expression<Func<TEntity, bool>>? checkDuplicate = null)
	{
		using var repository = RepositoryFactory.Create();

		return repository.Inner.CreateAsync(entity, checkDuplicate);
	}

	public Task<CrudResult<TSelf>> CreateOrUpdateAsync<TSelf>(TKey id, TSelf entity, Expression<Func<TSelf, bool>>? checkDuplicate = null)
		where TSelf : Entity<TKey>, IUpdatable<TSelf>
	{
		using var repository = RepositoryFactory.Create();

		return repository.Inner.CreateOrUpdateAsync(id, entity, checkDuplicate);
	}

	public Task<CrudResult> DeleteAsync<TEntityToDelete>(TEntityToDelete entityToDelete)
		where TEntityToDelete : IHasKey<TKey>
	{
		using var repository = RepositoryFactory.Create();

		return repository.Inner.DeleteAsync(entityToDelete);
	}

	public Task<CrudResult<TUpdatableEntity>> UpdateAsync<TUpdatableEntity, TFrom>(TKey id, TFrom from)
		where TUpdatableEntity : Entity<TKey>, IUpdatable<TFrom>
		where TFrom : notnull
	{
		using var repository = RepositoryFactory.Create();

		return repository.Inner.UpdateAsync<TUpdatableEntity, TFrom>(id, from);
	}

	public Task ClearTable()
	{
		using var repository = RepositoryFactory.Create();

		return repository.Inner.ClearTable();
	}
}
