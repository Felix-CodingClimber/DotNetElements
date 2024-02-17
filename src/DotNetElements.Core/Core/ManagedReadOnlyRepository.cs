using System.Linq.Expressions;

namespace DotNetElements.Core;

public abstract class ManagedReadOnlyRepository<TRepository, TEntity, TKey> : IReadOnlyRepository<TEntity, TKey>
    where TEntity : Entity<TKey>
    where TKey : notnull, IEquatable<TKey>
    where TRepository : IReadOnlyRepository<TEntity, TKey>
{
    protected readonly IScopedRepositoryFactory<TRepository, TEntity, TKey> RepositoryFactory;

    public ManagedReadOnlyRepository(IScopedRepositoryFactory<TRepository, TEntity, TKey> repositoryFactory)
    {
        this.RepositoryFactory = repositoryFactory;
    }

    public Task<IReadOnlyList<TEntity>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        using var repository = RepositoryFactory.Create();

        return repository.Inner.GetAllAsync(cancellationToken);
    }

    public Task<IReadOnlyList<TEntity>> GetAllFilteredAsync(
        Expression<Func<TEntity, bool>>? filter = null,
        Expression<Func<TEntity, object>>? orderBy = null,
        bool descending = true,
        CancellationToken cancellationToken = default)
    {
        using var repository = RepositoryFactory.Create();

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
        using var repository = RepositoryFactory.Create();

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
        using var repository = RepositoryFactory.Create();

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
        using var repository = RepositoryFactory.Create();

        return repository.Inner.GetAllWithProjectionAsync(selector, filter, orderBy, descending, cancellationToken);
    }

    public Task<CrudResult<TEntity>> GetByIdAsync(TKey id, CancellationToken cancellationToken = default)
    {
        using var repository = RepositoryFactory.Create();

        return repository.Inner.GetByIdAsync(id, cancellationToken);
    }

    public Task<CrudResult<TEntity>> GetByIdFilteredAsync(TKey id, Expression<Func<TEntity, bool>>? filter = null, CancellationToken cancellationToken = default)
    {
        using var repository = RepositoryFactory.Create();

        return repository.Inner.GetByIdFilteredAsync(id, filter, cancellationToken);
    }

    public Task<CrudResult<TProjection>> GetByIdWithProjectionAsync<TProjection>(
        TKey id,
        Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector,
        Expression<Func<TEntity, bool>>? filter = null,
        CancellationToken cancellationToken = default)
    {
        using var repository = RepositoryFactory.Create();

        return repository.Inner.GetByIdWithProjectionAsync(id, selector, filter, cancellationToken);
    }

    public Task<CrudResult<AuditedModelDetails>> GetAuditedModelDetailsByIdAsync<TAuditedEntity>(TKey id, CancellationToken cancellationToken = default)
        where TAuditedEntity : AuditedEntity<TKey>
    {
        using var repository = RepositoryFactory.Create();

        return repository.Inner.GetAuditedModelDetailsByIdAsync<TAuditedEntity>(id, cancellationToken);
    }

    public Task<CrudResult<TProjection>> GetFilteredWithProjectionAsync<TProjection>(
        Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector,
        Expression<Func<TEntity, bool>> filter,
        CancellationToken cancellationToken = default)
    {
        using var repository = RepositoryFactory.Create();

        return repository.Inner.GetFilteredWithProjectionAsync<TProjection>(selector, filter, cancellationToken);
    }
}
