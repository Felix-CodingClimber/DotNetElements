using System.Linq.Expressions;

namespace BlazorCrud.Core;

public abstract class ReadOnlyRepository<TDbContext, TEntity, TKey> : IReadOnlyRepository<TEntity, TKey>
	where TDbContext : DbContext
	where TEntity : Entity<TKey>
	where TKey : notnull
{
	protected TDbContext DbContext { get; private init; }
	protected DbSet<TEntity> Entities { get; private init; }

	public static Expression<Func<TEntity, bool>> WithId(TKey id) => entity => entity.Id.Equals(id);

	public ReadOnlyRepository(TDbContext dbContext)
	{
		DbContext = dbContext;

		Entities = dbContext.Set<TEntity>();
	}

	public virtual async Task<Result<TEntity>> GetByIdAsync(TKey id)
	{
		TEntity? entity = await Entities.AsNoTracking().FirstOrDefaultAsync(WithId(id));

		if (entity is null)
			return Result.EntityNotFound(id);

		return Result.Ok(entity);
	}

	public async Task<Result<TEntity>> GetByIdAsync(
		TKey id,
		Expression<Func<TEntity, bool>>? filter = null)
	{
		IQueryable<TEntity> entityQuery = Entities.AsNoTracking();

		if (filter is not null)
			entityQuery = entityQuery.Where(filter);

		TEntity? entity = await entityQuery.FirstOrDefaultAsync(WithId(id));

		if (entity is null)
			return Result.EntityNotFound(id);

		return Result.Ok(entity);
	}

	public async Task<Result<TProjection>> GetByIdWithProjectionAsync<TProjection>(
		TKey id,
		Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector,
		Expression<Func<TEntity, bool>>? filter = null)
	{
		ArgumentNullException.ThrowIfNull(selector);

		IQueryable<TEntity> entityQuery = Entities.AsNoTracking();

		if (filter is not null)
			entityQuery = entityQuery.Where(filter);

		TProjection? projectedEntity = await selector.Compile().Invoke(entityQuery.Where(WithId(id))).FirstOrDefaultAsync();

		if (projectedEntity is null)
			return Result.EntityNotFound(id);

		return Result.Ok(projectedEntity);
	}

	public virtual async Task<IReadOnlyList<TEntity>> GetAllAsync()
	{
		return await Entities.AsNoTracking().ToListAsync();
	}

	public async Task<IReadOnlyList<TEntity>> GetAllAsync(
		Expression<Func<TEntity, bool>>? filter = null,
		Expression<Func<TEntity, object>>? orderBy = null,
		bool descending = true)
	{
		IQueryable<TEntity> entityQuery = Entities.AsNoTracking();

		if (filter is not null)
			entityQuery = entityQuery.Where(filter);

		if (orderBy is not null)
			entityQuery = descending ? entityQuery.OrderByDescending(orderBy) : entityQuery.OrderBy(orderBy);

		return await entityQuery.ToListAsync();
	}

	public async Task<IReadOnlyList<TProjection>> GetAllWithProjectionAsync<TProjection>(
		Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector,
		Expression<Func<TEntity, bool>>? filter = null,
		Expression<Func<TEntity, object>>? orderBy = null,
		bool descending = true)
	{
		ArgumentNullException.ThrowIfNull(selector);

		IQueryable<TEntity> entityQuery = Entities.AsNoTracking();

		if (filter is not null)
			entityQuery = entityQuery.Where(filter);

		if (orderBy is not null)
			entityQuery = descending ? entityQuery.OrderByDescending(orderBy) : entityQuery.OrderBy(orderBy);

		return await selector.Compile().Invoke(entityQuery).ToListAsync();
	}

	public async Task<IPagedList<TEntity>> GetAllPagedAsync(
		Expression<Func<TEntity, bool>>? filter = null,
		Expression<Func<TEntity, object>>? orderBy = null,
		bool descending = true,
		int page = 1,
		int pageSize = int.MaxValue)
	{
		return await GetAllPagedWithProjectionAsync(selector => selector, filter, orderBy, descending, page, pageSize);
	}

	public async Task<IPagedList<TProjection>> GetAllPagedWithProjectionAsync<TProjection>(
		Expression<Func<IQueryable<TEntity>, IQueryable<TProjection>>> selector,
		Expression<Func<TEntity, bool>>? filter = null,
		Expression<Func<TEntity, object>>? orderBy = null,
		bool descending = true,
		int page = 1,
		int pageSize = int.MaxValue)
	{
		ArgumentNullException.ThrowIfNull(selector);

		IQueryable<TEntity> entityQuery = Entities.AsNoTracking();

		if (filter is not null)
			entityQuery = entityQuery.Where(filter);

		if (orderBy is not null)
			entityQuery = descending ? entityQuery.OrderByDescending(orderBy) : entityQuery.OrderBy(orderBy);

		return await selector.Compile().Invoke(entityQuery).ToPagedListAsync(page, pageSize);
	}

	public async Task<Result<AuditedModelDetails>> GetAuditedModelDetailsByIdAsync<TAuditedEntity>(TKey id)
		where TAuditedEntity : AuditedEntity<TKey>
	{
		DbSet<TAuditedEntity> localDbSet = DbContext.Set<TAuditedEntity>();

		AuditedModelDetails? entity = await localDbSet
			.AsNoTracking()
			.Where(entity => entity.Id.Equals(id))
			.Select(entity =>
				new AuditedModelDetails()
				{
					CreatorId = entity.CreatorId,
					Creator = "Felix",
					CreationTime = entity.CreationTime,
					LastModifierId = entity.LastModifierId,
					LastModifier = "Felix",
					LastModificationTime = entity.LastModificationTime,
				}
		).FirstOrDefaultAsync();

		return entity is null ? Result.Fail("") : Result.Ok(entity);
	}
}