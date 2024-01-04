using System.Linq.Expressions;

namespace BlazorCrud.Core;

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

	public Task<Result<TEntity>> CreateAsync(TEntity entity, Expression<Func<TEntity, bool>>? checkDuplicate = null)
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.CreateAsync(entity, checkDuplicate);
	}

	public Task<Result<TSelf>> CreateOrUpdateAsync<TSelf>(TKey id, TSelf entity, Expression<Func<TSelf, bool>>? checkDuplicate = null)
		where TSelf : Entity<TKey>, IUpdatable<TSelf>
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.CreateOrUpdateAsync(id, entity, checkDuplicate);
	}

	public Task<Result> DeleteAsync(TKey id)
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.DeleteAsync(id);
	}

	public Task<IReadOnlyList<TEntity>> GetAllAsync()
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.GetAllAsync();
	}

	public Task<IReadOnlyList<TEntity>> GetAllAsync(
		Expression<Func<TEntity, bool>>? filter = null,
		Expression<Func<TEntity, object>>? orderBy = null,
		bool descending = true)
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.GetAllAsync(filter, orderBy, descending);
	}

	public Task<IPagedList<TEntity>> GetAllPagedAsync(
		Expression<Func<TEntity, bool>>? filter = null,
		Expression<Func<TEntity, object>>? orderBy = null,
		bool descending = true,
		int page = 1,
		int pageSize = int.MaxValue)
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.GetAllPagedAsync(filter, orderBy, descending, page, pageSize);
	}

	public Task<IPagedList<TProjection>> GetAllPagedWithProjectionAsync<TProjection>(
		Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector,
		Expression<Func<TEntity, bool>>? filter = null,
		Expression<Func<TEntity, object>>? orderBy = null,
		bool descending = true,
		int page = 1,
		int pageSize = int.MaxValue)
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.GetAllPagedWithProjectionAsync(selector, filter, orderBy, descending, page, pageSize);
	}

	public Task<IReadOnlyList<TProjection>> GetAllWithProjectionAsync<TProjection>(
		Expression<Func<IQueryable<TEntity>,
			IQueryable<TProjection>>> selector,
		Expression<Func<TEntity, bool>>? filter = null,
		Expression<Func<TEntity, object>>? orderBy = null,
		bool descending = true)
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.GetAllWithProjectionAsync(selector, filter, orderBy, descending);
	}

	public Task<Result<TEntity>> GetByIdAsync(TKey id)
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.GetByIdAsync(id);
	}

	public Task<Result<TEntity>> GetByIdAsync(TKey id, Expression<Func<TEntity, bool>>? filter = null)
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.GetByIdAsync(id, filter);
	}

	public Task<Result<TProjection>> GetByIdWithProjectionAsync<TProjection>(
		TKey id,
		Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector,
		Expression<Func<TEntity, bool>>? filter = null)
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.GetByIdWithProjectionAsync(id, selector, filter);
	}

	public Task<Result<TUpdatableEntity>> UpdateAsync<TUpdatableEntity, TFrom>(TKey id, TFrom from)
		where TUpdatableEntity : Entity<TKey>, IUpdatable<TFrom>
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.UpdateAsync<TUpdatableEntity, TFrom>(id, from);
	}

	public Task ClearTable()
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.ClearTable();
	}

	public Task<Result<AuditedModelDetails>> GetAuditedModelDetailsByIdAsync<TAuditedEntity>(TKey id)
		where TAuditedEntity : AuditedEntity<TKey>
	{
		using var repository = repositoryFactory.Create();

		return repository.Inner.GetAuditedModelDetailsByIdAsync<TAuditedEntity>(id);
	}
}
