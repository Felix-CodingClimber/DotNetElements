using System.Linq.Expressions;

namespace DotNetElements.Core;

public abstract class ManagedRepository<TRepository, TEntity, TKey> : IRepository<TEntity, TKey>
	where TEntity : Entity<TKey>
	where TKey : notnull
	where TRepository : IRepository<TEntity, TKey>
{
	private readonly IScopedRepositoryFactory<TRepository, TEntity, TKey> repositoryFactory;

	public ManagedRepository(IScopedRepositoryFactory<TRepository, TEntity, TKey> repositoryFactory)
	{
		this.repositoryFactory = repositoryFactory;
	}

	public Task<CrudResult<TEntity>> CreateAsync(TEntity entity, Expression<Func<TEntity, bool>>? checkDuplicate = null)
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.CreateAsync(entity, checkDuplicate);
	}

	public Task<CrudResult<TSelf>> CreateOrUpdateAsync<TSelf>(TKey id, TSelf entity, Expression<Func<TSelf, bool>>? checkDuplicate = null)
		where TSelf : Entity<TKey>, IUpdatable<TSelf>
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.CreateOrUpdateAsync(id, entity, checkDuplicate);
	}

	public Task<CrudResult> DeleteAsync<TEntityToDelete>(TEntityToDelete entityToDelete)
		where TEntityToDelete : IHasKey<TKey>, IHasVersionReadOnly
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.DeleteAsync(entityToDelete);
	}

	public Task<IReadOnlyList<TEntity>> GetAllAsync(CancellationToken cancellationToken = default)
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.GetAllAsync(cancellationToken);
	}

	public Task<IReadOnlyList<TEntity>> GetAllFilteredAsync(
		Expression<Func<TEntity, bool>>? filter = null,
		Expression<Func<TEntity, object>>? orderBy = null,
		bool descending = true,
		CancellationToken cancellationToken = default)
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.GetAllFilteredAsync(filter, orderBy, descending, cancellationToken);
	}

	public Task<IPagedList<TEntity>> GetAllPagedAsync(
		Expression<Func<TEntity, bool>>? filter = null,
		Expression<Func<TEntity, object>>? orderBy = null,
		bool descending = true,
		int page = 1,
		int pageSize = int.MaxValue,
		CancellationToken cancellationToken = default)
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.GetAllPagedAsync(filter, orderBy, descending, page, pageSize, cancellationToken);
	}

	public Task<IPagedList<TProjection>> GetAllPagedWithProjectionAsync<TProjection>(
		Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector,
		Expression<Func<TEntity, bool>>? filter = null,
		Expression<Func<TEntity, object>>? orderBy = null,
		bool descending = true,
		int page = 1,
		int pageSize = int.MaxValue,
		CancellationToken cancellationToken = default)
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.GetAllPagedWithProjectionAsync(selector, filter, orderBy, descending, page, pageSize, cancellationToken);
	}

	public Task<IReadOnlyList<TProjection>> GetAllWithProjectionAsync<TProjection>(
		Expression<Func<IQueryable<TEntity>,
			IQueryable<TProjection>>> selector,
		Expression<Func<TEntity, bool>>? filter = null,
		Expression<Func<TEntity, object>>? orderBy = null,
		bool descending = true,
		CancellationToken cancellationToken = default)
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.GetAllWithProjectionAsync(selector, filter, orderBy, descending, cancellationToken);
	}

	public Task<CrudResult<TEntity>> GetByIdAsync(TKey id, CancellationToken cancellationToken = default)
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.GetByIdAsync(id, cancellationToken);
	}

	public Task<CrudResult<TEntity>> GetByIdFilteredAsync(TKey id, Expression<Func<TEntity, bool>>? filter = null, CancellationToken cancellationToken = default)
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.GetByIdFilteredAsync(id, filter, cancellationToken);
	}

	public Task<CrudResult<TProjection>> GetByIdWithProjectionAsync<TProjection>(
		TKey id,
		Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector,
		Expression<Func<TEntity, bool>>? filter = null,
		CancellationToken cancellationToken = default)
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.GetByIdWithProjectionAsync(id, selector, filter, cancellationToken);
	}

	public Task<CrudResult<TUpdatableEntity>> UpdateAsync<TUpdatableEntity, TFrom>(TKey id, TFrom from)
		where TUpdatableEntity : Entity<TKey>, IUpdatable<TFrom>
		where TFrom : notnull
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.UpdateAsync<TUpdatableEntity, TFrom>(id, from);
	}

	public Task ClearTable()
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.ClearTable();
	}

	public Task<CrudResult<AuditedModelDetails>> GetAuditedModelDetailsByIdAsync<TAuditedEntity>(TKey id, CancellationToken cancellationToken = default)
		where TAuditedEntity : AuditedEntity<TKey>
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.GetAuditedModelDetailsByIdAsync<TAuditedEntity>(id, cancellationToken);
	}
}
