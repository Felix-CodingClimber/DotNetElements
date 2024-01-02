using System.Linq.Expressions;

namespace BlazorCrud.Core;

public interface IManagedRepository<TEntity, TEditModel, TKey> : IRepository<TEntity, TEditModel, TKey>
    where TEntity : Entity<TKey>, IUpdatableFromModel<TEditModel>
    where TKey : notnull
{ }

public class ManagedRepository<TEntity, TEditModel, TKey> : IRepository<TEntity, TEditModel, TKey>
    where TEntity : Entity<TKey>, IUpdatableFromModel<TEditModel>
    where TKey : notnull
{
    private readonly IRepositoryFactory<TEntity, TEditModel, TKey> repositoryFactory;

    public ManagedRepository(IRepositoryFactory<TEntity, TEditModel, TKey> repositoryFactory)
    {
        this.repositoryFactory = repositoryFactory;
    }

    public Task<Result<TEntity>> CreateAsync(TEntity entity, Expression<Func<TEntity, bool>>? checkDuplicate = null)
    {
        var repository = repositoryFactory.Create();

        
    }

    public Task<Result<TSelf>> CreateOrUpdateAsync<TSelf>(TKey id, TSelf entity)
        where TSelf : Entity<TKey>, IUpdatableFromSelf<TSelf>
    {

    }

    public Task<Result> DeleteAsync(TKey id)
    {

    }

    public Task<IReadOnlyList<TEntity>> GetAllAsync()
    {

    }

    public Task<IReadOnlyList<TEntity>> GetAllAsync(
        Expression<Func<TEntity, bool>>? filter = null,
        Expression<Func<TEntity, object>>? orderBy = null,
        bool descending = true)
    {

    }

    public Task<IPagedList<TEntity>> GetAllPagedAsync(
        Expression<Func<TEntity, bool>>? filter = null,
        Expression<Func<TEntity, object>>? orderBy = null,
        bool descending = true,
        int page = 1,
        int pageSize = int.MaxValue)
    {

    }

    public Task<IPagedList<TProjection>> GetAllPagedWithProjectionAsync<TProjection>(
        Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector,
        Expression<Func<TEntity, bool>>? filter = null,
        Expression<Func<TEntity, object>>? orderBy = null,
        bool descending = true,
        int page = 1,
        int pageSize = int.MaxValue)
    {

    }

    public Task<IReadOnlyList<TProjection>> GetAllWithProjectionAsync<TProjection>(
        Expression<Func<IQueryable<TEntity>,
            IQueryable<TProjection>>> selector,
        Expression<Func<TEntity, bool>>? filter = null,
        Expression<Func<TEntity, object>>? orderBy = null,
        bool descending = true)
    {

    }

    public Task<Result<TEntity>> GetByIdAsync(TKey id)
    {

    }

    public Task<Result<TEntity>> GetByIdAsync(TKey id, Expression<Func<TEntity, bool>>? filter = null)
    {

    }

    public Task<Result<TProjection>> GetByIdWithProjectionAsync<TProjection>(
        TKey id,
        Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector,
        Expression<Func<TEntity, bool>>? filter = null)
    {

    }

    public Task<Result<TEntity>> UpdateAsync(TKey id, TEditModel from)
    {

    }

    public Task<Result<TSelf>> UpdateFromSelfAsync<TSelf>(TKey id, TSelf from)
        where TSelf : Entity<TKey>, IUpdatableFromSelf<TSelf>
    {

    }
}
