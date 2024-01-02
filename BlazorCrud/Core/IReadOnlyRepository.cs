using System.Linq.Expressions;

namespace BlazorCrud.Core;
public interface IReadOnlyRepository<TEntity, TKey>
    where TEntity : Entity<TKey>
    where TKey : notnull
{
    Task<IReadOnlyList<TEntity>> GetAllAsync();
    Task<IReadOnlyList<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>>? filter = null, Expression<Func<TEntity, object>>? orderBy = null, bool descending = true);
    Task<IPagedList<TEntity>> GetAllPagedAsync(Expression<Func<TEntity, bool>>? filter = null, Expression<Func<TEntity, object>>? orderBy = null, bool descending = true, int page = 1, int pageSize = int.MaxValue);
    Task<IPagedList<TProjection>> GetAllPagedWithProjectionAsync<TProjection>(Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector, Expression<Func<TEntity, bool>>? filter = null, Expression<Func<TEntity, object>>? orderBy = null, bool descending = true, int page = 1, int pageSize = int.MaxValue);
    Task<IReadOnlyList<TProjection>> GetAllWithProjectionAsync<TProjection>(Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector, Expression<Func<TEntity, bool>>? filter = null, Expression<Func<TEntity, object>>? orderBy = null, bool descending = true);
    Task<Result<TEntity>> GetByIdAsync(TKey id);
    Task<Result<TEntity>> GetByIdAsync(TKey id, Expression<Func<TEntity, bool>>? filter = null);
    Task<Result<TProjection>> GetByIdWithProjectionAsync<TProjection>(TKey id, Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector, Expression<Func<TEntity, bool>>? filter = null);
}