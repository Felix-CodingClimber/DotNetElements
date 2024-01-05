using System.Linq.Expressions;

namespace BlazorCrud.Core;
public interface IReadOnlyRepository<TEntity, TKey>
	where TEntity : Entity<TKey>
	where TKey : notnull
{
	Task<IReadOnlyList<TEntity>> GetAllAsync(CancellationToken cancellationToken = default);

	Task<IReadOnlyList<TEntity>> GetAllAsync(
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

	Task<Result<TEntity>> GetByIdAsync(TKey id, CancellationToken cancellationToken = default);

	Task<Result<TEntity>> GetByIdAsync(
		TKey id,
		Expression<Func<TEntity, bool>>? filter = null,
		CancellationToken cancellationToken = default);

	Task<Result<TProjection>> GetByIdWithProjectionAsync<TProjection>(
		TKey id,
		Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector,
		Expression<Func<TEntity, bool>>? filter = null,
		CancellationToken cancellationToken = default);

	Task<Result<AuditedModelDetails>> GetAuditedModelDetailsByIdAsync<TAuditedEntity>(
		TKey id,
		CancellationToken cancellationToken = default)
		where TAuditedEntity : AuditedEntity<TKey>;
}