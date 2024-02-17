using System.Linq.Expressions;

namespace DotNetElements.Core;

public abstract class ReadOnlyRepository<TDbContext, TEntity, TKey> : IReadOnlyRepository<TEntity, TKey>
    where TDbContext : DbContext
    where TEntity : Entity<TKey>
    where TKey : notnull, IEquatable<TKey>
{
    protected TDbContext DbContext { get; private init; }
    protected DbSet<TEntity> Entities { get; private init; }

    public static Expression<Func<TEntity, bool>> WithId(TKey id) => entity => entity.Id.Equals(id);

    public static Expression<Func<TEntityWithKey, bool>> WithId<TEntityWithKey>(TKey id)
        where TEntityWithKey : Entity<TKey>
    {
        return entity => entity.Id.Equals(id);
    }

    public ReadOnlyRepository(TDbContext dbContext)
    {
        DbContext = dbContext;

        Entities = dbContext.Set<TEntity>();
    }

    public virtual async Task<CrudResult<TEntity>> GetByIdAsync(TKey id, CancellationToken cancellationToken = default)
    {
        TEntity? entity = await Entities.AsNoTracking().FirstOrDefaultAsync(WithId(id), cancellationToken);

        return CrudResult.OkIfNotNull(entity, CrudError.NotFound, id.ToString());
    }

    public async Task<CrudResult<TEntity>> GetByIdFilteredAsync(
        TKey id,
        Expression<Func<TEntity, bool>>? filter = null,
        CancellationToken cancellationToken = default)
    {
        IQueryable<TEntity> entityQuery = Entities.AsNoTracking();

        if (filter is not null)
            entityQuery = entityQuery.Where(filter);

        TEntity? entity = await entityQuery.FirstOrDefaultAsync(WithId(id), cancellationToken);

        return CrudResult.OkIfNotNull(entity, CrudError.NotFound, id.ToString());
    }

    public async Task<CrudResult<TProjection>> GetFilteredWithProjectionAsync<TProjection>(
        Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector,
        Expression<Func<TEntity, bool>> filter,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(selector);
        ArgumentNullException.ThrowIfNull(filter);

        IQueryable<TEntity> entityQuery = Entities.AsNoTracking();

        // todo check if where produces the best query for only one item
        TProjection? projectedEntity = await selector.Compile().Invoke(entityQuery.Where(filter)).FirstOrDefaultAsync(cancellationToken);

        return CrudResult.OkIfNotNull(projectedEntity, CrudError.NotFound);
    }

    public async Task<CrudResult<TProjection>> GetByIdWithProjectionAsync<TProjection>(
        TKey id,
        Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector,
        Expression<Func<TEntity, bool>>? filter = null,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(selector);

        IQueryable<TEntity> entityQuery = Entities.AsNoTracking();

        if (filter is not null)
            entityQuery = entityQuery.Where(filter);

        // todo check if where produces the best query for only one item
        TProjection? projectedEntity = await selector.Compile().Invoke(entityQuery.Where(WithId(id))).FirstOrDefaultAsync(cancellationToken);

        return CrudResult.OkIfNotNull(projectedEntity, CrudError.NotFound, id.ToString());
    }

    public virtual async Task<IReadOnlyList<TEntity>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await Entities.AsNoTracking().ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<TEntity>> GetAllFilteredAsync(
        Expression<Func<TEntity, bool>>? filter = null,
        Expression<Func<TEntity, object>>? orderBy = null,
        bool descending = true,
        CancellationToken cancellationToken = default)
    {
        IQueryable<TEntity> entityQuery = Entities.AsNoTracking();

        if (filter is not null)
            entityQuery = entityQuery.Where(filter);

        if (orderBy is not null)
            entityQuery = descending ? entityQuery.OrderByDescending(orderBy) : entityQuery.OrderBy(orderBy);

        return await entityQuery.ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<TProjection>> GetAllWithProjectionAsync<TProjection>(
        Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector,
        Expression<Func<TEntity, bool>>? filter = null,
        Expression<Func<TEntity, object>>? orderBy = null,
        bool descending = true,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(selector);

        IQueryable<TEntity> entityQuery = Entities.AsNoTracking();

        if (filter is not null)
            entityQuery = entityQuery.Where(filter);

        if (orderBy is not null)
            entityQuery = descending ? entityQuery.OrderByDescending(orderBy) : entityQuery.OrderBy(orderBy);

        return await selector.Compile().Invoke(entityQuery).ToListAsync(cancellationToken);
    }

    public async Task<IPagedList<TEntity>> GetAllPagedAsync(
        Expression<Func<TEntity, bool>>? filter = null,
        Expression<Func<TEntity, object>>? orderBy = null,
        bool descending = true,
        int page = 1,
        int pageSize = int.MaxValue,
        CancellationToken cancellationToken = default)
    {
        return await GetAllPagedWithProjectionAsync(selector => selector, filter, orderBy, descending, page, pageSize, cancellationToken);
    }

    public async Task<IPagedList<TProjection>> GetAllPagedWithProjectionAsync<TProjection>(
        Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector,
        Expression<Func<TEntity, bool>>? filter = null,
        Expression<Func<TEntity, object>>? orderBy = null,
        bool descending = true,
        int page = 1,
        int pageSize = int.MaxValue,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(selector);

        IQueryable<TEntity> entityQuery = Entities.AsNoTracking();

        if (filter is not null)
            entityQuery = entityQuery.Where(filter);

        if (orderBy is not null)
            entityQuery = descending ? entityQuery.OrderByDescending(orderBy) : entityQuery.OrderBy(orderBy);

        return await selector.Compile().Invoke(entityQuery).ToPagedListAsync(page, pageSize, cancellationToken);
    }

    public async Task<CrudResult<AuditedModelDetails>> GetAuditedModelDetailsByIdAsync<TAuditedEntity>(TKey id, CancellationToken cancellationToken = default)
        where TAuditedEntity : AuditedEntity<TKey>
    {
        DbSet<TAuditedEntity> localDbSet = DbContext.Set<TAuditedEntity>();

        AuditedModelDetails? entity = await localDbSet
            .AsNoTracking()
            .Where(WithId<TAuditedEntity>(id))
            .Select(entity =>
                new AuditedModelDetails()
                {
                    CreatorId = entity.CreatorId,
                    Creator = "Felix", // todo get from user
                    CreationTime = entity.CreationTime,
                    LastModifierId = entity.LastModifierId,
                    LastModifier = "Felix", // todo get from user
                    LastModificationTime = entity.LastModificationTime,
                }
        ).FirstOrDefaultAsync(cancellationToken);

        return CrudResult.OkIfNotNull(entity, CrudError.NotFound, id.ToString());
    }
}