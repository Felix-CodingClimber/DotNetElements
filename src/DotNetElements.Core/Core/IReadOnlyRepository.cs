using System.Linq.Expressions;

namespace DotNetElements.Core;

public interface IReadOnlyRepository<TEntity, TKey>
	where TEntity : Entity<TKey>
	where TKey : notnull
{
	Task<IReadOnlyList<TEntity>> GetAllAsync(CancellationToken cancellationToken = default);

	Task<IReadOnlyList<TEntity>> GetAllFilteredAsync(
		Expression<Func<TEntity, bool>>? filter = null,
		Expression<Func<TEntity, object>>? orderBy = null,
		bool descending = true,
		CancellationToken cancellationToken = default);

	Task<IPagedList<TEntity>> GetAllPagedAsync(
		Expression<Func<TEntity, bool>>? filter = null,
		Expression<Func<TEntity, object>>? orderBy = null,
		bool descending = true,
		int page = 1,
		int pageSize = int.MaxValue,
		CancellationToken cancellationToken = default);

	Task<IPagedList<TProjection>> GetAllPagedWithProjectionAsync<TProjection>(
		Expression<Func<IQueryable<TEntity>,
		IQueryable<TProjection>>> selector,
		Expression<Func<TEntity, bool>>? filter = null,
		Expression<Func<TEntity, object>>? orderBy = null,
		bool descending = true,
		int page = 1,
		int pageSize = int.MaxValue,
		CancellationToken cancellationToken = default);

	Task<IReadOnlyList<TProjection>> GetAllWithProjectionAsync<TProjection>(
		Expression<Func<IQueryable<TEntity>,
			IQueryable<TProjection>>> selector,
		Expression<Func<TEntity, bool>>? filter = null,
		Expression<Func<TEntity, object>>? orderBy = null,
		bool descending = true,
		CancellationToken cancellationToken = default);

	Task<CrudResult<TEntity>> GetByIdAsync(TKey id, CancellationToken cancellationToken = default);

	Task<CrudResult<TEntity>> GetByIdFilteredAsync(
		TKey id,
		Expression<Func<TEntity, bool>>? filter = null,
		CancellationToken cancellationToken = default);

	Task<CrudResult<TProjection>> GetByIdWithProjectionAsync<TProjection>(
		TKey id,
		Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector,
		Expression<Func<TEntity, bool>>? filter = null,
		CancellationToken cancellationToken = default);

	Task<CrudResult<AuditedModelDetails>> GetAuditedModelDetailsByIdAsync<TAuditedEntity>(
		TKey id,
		CancellationToken cancellationToken = default)
		where TAuditedEntity : AuditedEntity<TKey>;
}