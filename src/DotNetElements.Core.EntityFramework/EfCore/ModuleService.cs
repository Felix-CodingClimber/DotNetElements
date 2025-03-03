namespace DotNetElements.Core.EntityFramework;

public abstract class ModuleService<TDbContext>
	where TDbContext : DbContext
{
	protected readonly TDbContext DbContext;

	protected ModuleService(TDbContext dbContext)
	{
		DbContext = dbContext;
	}

	protected bool EnsureVersion<TEntity, TKey>(TEntity entity, TEntity existingEntity)
		where TEntity : class, IEntity<TKey>, IEntityHasVersion
		where TKey : notnull, IEquatable<TKey>
	{
		if (entity.Version != existingEntity.Version)
			return false;

		entity.UpdateVersion();

		return true;
	}

	protected async Task<CrudResult<CreationAuditedModelDetails>> GetCreationAuditedDetailsByEntityId<TEntity, TKey>(TKey id)
		where TEntity : class, IEntity<TKey>, ICreationAuditedEntity
		where TKey : notnull, IEquatable<TKey>
	{
		IQueryable<TEntity> query = DbContext
			.Set<TEntity>()
			.AsNoTracking()
			.WithId(id);

		CreationAuditedModelDetails? details = await query
			.Select(entity =>
				new CreationAuditedModelDetails()
				{
					CreatorId = entity.CreatorId,
					CreatorDisplayName = "", // todo
					CreationTime = entity.CreationTime,
				})
			.FirstOrDefaultAsync();

		return CrudResultHelperExtensions.OkIfNotNull(details, CrudError.NotFound);
	}

	protected async Task<CrudResult<AuditedModelDetails>> GetAuditedDetailsByEntityId<TEntity, TKey>(TKey id)
		where TEntity : class, IEntity<TKey>, IAuditedEntity
		where TKey : notnull, IEquatable<TKey>
	{
		IQueryable<TEntity> query = DbContext
			.Set<TEntity>()
			.AsNoTracking()
			.WithId(id);

		AuditedModelDetails? details = await query
			.Select(entity =>
				new AuditedModelDetails()
				{
					CreatorId = entity.CreatorId,
					CreatorDisplayName = "", // todo
					CreationTime = entity.CreationTime,
					LastModifierId = entity.LastModifierId,
					LastModifierDisplayName = "", // todo
					LastModificationTime = entity.LastModificationTime
				})
			.FirstOrDefaultAsync();

		return CrudResultHelperExtensions.OkIfNotNull(details, CrudError.NotFound);
	}

	protected async Task<CrudResult<DeletionAuditedModelDetails>> GetDeletionAuditedDetailsByEntityId<TEntity, TKey>(TKey id)
		where TEntity : class, IEntity<TKey>, IDeletionAuditedEntity
		where TKey : notnull, IEquatable<TKey>
	{
		IQueryable<TEntity> query = DbContext
			.Set<TEntity>()
			.AsNoTracking()
			.WithId(id);

		DeletionAuditedModelDetails? details = await query
			.Select(entity =>
				new DeletionAuditedModelDetails()
				{
					CreatorId = entity.CreatorId,
					CreatorDisplayName = "", // todo
					CreationTime = entity.CreationTime,
					LastModifierId = entity.LastModifierId,
					LastModifierDisplayName = "", // todo
					LastModificationTime = entity.LastModificationTime,
					IsDeleted = entity.IsDeleted,
					DeleterId = entity.DeleterId,
					DeleterDisplayName = "", // todo
					DeletionTime = entity.DeletionTime
				})
			.FirstOrDefaultAsync();

		return CrudResultHelperExtensions.OkIfNotNull(details, CrudError.NotFound);
	}
}
