using System.Linq.Expressions;
using System.Reflection;

namespace DotNetElements.Core;

public abstract class Repository<TDbContext, TEntity, TKey> : ReadOnlyRepository<TDbContext, TEntity, TKey>, IRepository<TEntity, TKey>, IAttachRelatedEntity
	where TDbContext : DbContext
	where TEntity : Entity<TKey>
	where TKey : notnull
{
	protected ICurrentUserProvider CurrentUserProvider { get; private init; }
	protected TimeProvider TimeProvider { get; private init; }

	public Repository(TDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider) : base(dbContext)
	{
		CurrentUserProvider = currentUserProvider;
		TimeProvider = timeProvider;
	}

	public virtual async Task<CrudResult<TEntity>> CreateAsync(TEntity entity, Expression<Func<TEntity, bool>>? checkDuplicate = null)
	{
		ArgumentNullException.ThrowIfNull(entity);

		if (checkDuplicate is not null)
		{
			bool isDuplicate = await Entities.AnyAsync(checkDuplicate);

			if (isDuplicate)
				return CrudResult.DuplicateEntry();
		}

		// Set audit properties if needed
		if (entity is ICreationAuditedEntity<TKey> auditedEntity)
			auditedEntity.SetCreationAudited(CurrentUserProvider.GetCurrentUserId(), TimeProvider.GetUtcNow());

		var createdEntity = Entities.Attach(entity);

		await DbContext.SaveChangesAsync();

		return createdEntity.Entity;
	}

	public virtual async Task<CrudResult<TSelf>> CreateOrUpdateAsync<TSelf>(TKey id, TSelf entity, Expression<Func<TSelf, bool>>? checkDuplicate = null)
		where TSelf : Entity<TKey>, IUpdatable<TSelf>
	{
		ArgumentNullException.ThrowIfNull(entity);

		// If id is not set yet, the entity must be new
		if (id.Equals(default(TKey)))
		{
			if (checkDuplicate is not null)
			{
				bool isDuplicate = await DbContext.Set<TSelf>().AnyAsync(checkDuplicate);

				if (isDuplicate)
					return CrudResult.DuplicateEntry();
			}

			// Set audit properties if needed
			if (entity is ICreationAuditedEntity<TKey> auditedEntity)
				auditedEntity.SetCreationAudited(CurrentUserProvider.GetCurrentUserId(), TimeProvider.GetUtcNow());

			var createdEntity = DbContext.Set<TSelf>().Attach(entity);

			await DbContext.SaveChangesAsync();

			return createdEntity.Entity;
		}
		else
		{
			// Update existing entity
			TSelf? existingEntity = await DbContext.Set<TSelf>().FirstOrDefaultAsync(WithId<TSelf>(id));

			if (existingEntity is null)
				return CrudResult.NotFound(id);

			entity.Update(entity, this);

			// Check if entity has changed and set audit properties if needed
			if (DbContext.ChangeTracker.HasChanges())
			{
				if (existingEntity is IAuditedEntity<TKey> auditedEntity)
					auditedEntity.SetModificationAudited(CurrentUserProvider.GetCurrentUserId(), TimeProvider.GetUtcNow());

				UpdateEntityVersion(existingEntity, entity);

				if (!await SaveChangesWithVersionCheckAsync())
					return CrudResult.ConcurrencyConflict();
			}

			return existingEntity;
		}
	}

	public virtual async Task<CrudResult<TUpdatableEntity>> UpdateAsync<TUpdatableEntity, TFrom>(TKey id, TFrom from)
		where TUpdatableEntity : Entity<TKey>, IUpdatable<TFrom>
		where TFrom : notnull
	{
		IQueryable<TUpdatableEntity> query = DbContext.Set<TUpdatableEntity>();

		RelatedEntitiesAttribute? relatedEntities = typeof(TUpdatableEntity).GetCustomAttribute<RelatedEntitiesAttribute>();

		if (relatedEntities is not null)
		{
			foreach (string relatedProperty in relatedEntities.ReferenceProperties)
				query = query.Include(relatedProperty);
		}

		TUpdatableEntity? existingEntity = await query.FirstOrDefaultAsync(WithId<TUpdatableEntity>(id));

		if (existingEntity is null)
			return CrudResult.NotFound(id);

		existingEntity.Update(from, this);

		// Check if entity has changed and set audit properties if needed
		if (DbContext.ChangeTracker.HasChanges())
		{
			if (existingEntity is IAuditedEntity<TKey> auditedEntity)
				auditedEntity.SetModificationAudited(CurrentUserProvider.GetCurrentUserId(), TimeProvider.GetUtcNow());

			UpdateEntityVersion(existingEntity, from);

			if (!await SaveChangesWithVersionCheckAsync())
				return CrudResult.ConcurrencyConflict();
		}

		return existingEntity;
	}

	// todo check if id and originalVersion is the right fit or if it would be better to get a entity as param
	// Or consider to remove the default null value to force the user to be explicit
	public virtual async Task<CrudResult> DeleteAsync<TEntityToDelete>(TEntityToDelete entityToDelete)
		where TEntityToDelete : IHasKey<TKey>, IHasVersionReadOnly
	{
		TEntity? existingEntity = await Entities.FirstOrDefaultAsync(WithId(entityToDelete.Id));

		if (existingEntity is null)
			return CrudResult.NotFound(entityToDelete.Id);

		if (existingEntity is IDeletionAuditedEntity deletionAuditedEntity)
		{
			deletionAuditedEntity.Delete(CurrentUserProvider.GetCurrentUserId(), TimeProvider.GetUtcNow());

			UpdateEntityVersion(existingEntity, entityToDelete.Version);
		}
		else if (existingEntity is IHasDeletionTime entityWithDeletionTime)
		{
			entityWithDeletionTime.Delete(TimeProvider.GetUtcNow());

			UpdateEntityVersion(existingEntity, entityToDelete.Version);
		}
		else if (existingEntity is ISoftDelete softDeletableEntity)
		{
			softDeletableEntity.Delete();

			UpdateEntityVersion(existingEntity, entityToDelete.Version);
		}
		else
		{
			Entities.Remove(existingEntity);
		}

		if (!await SaveChangesWithVersionCheckAsync())
			return CrudResult.ConcurrencyConflict();

		return CrudResult.Ok();
	}

	public virtual async Task ClearTable()
	{
		await Entities.ExecuteDeleteAsync();
	}

	// todo protected would be better!
	public TRelatedEntity AttachById<TRelatedEntity, TRelatedEntityKey>(TRelatedEntityKey id)
		where TRelatedEntity : Entity<TRelatedEntityKey>, IRelatedEntity<TRelatedEntity, TRelatedEntityKey>
		where TRelatedEntityKey : notnull
	{
		return DbContext.Set<TRelatedEntity>().Attach(TRelatedEntity.CreateRefById(id)).Entity;
	}

	protected void UpdateEntityVersion<TTargetEntity>(TTargetEntity entityFromDb, Guid? originalVersion)
		where TTargetEntity : notnull
	{
		if (entityFromDb is IHasVersion entityWithVersion)
		{
			entityWithVersion.Version = Guid.NewGuid();

			SetOriginalVersionQueried(entityFromDb, originalVersion);
		}
	}

	protected void UpdateEntityVersion<TTargetEntity, TSourceEntity>(TTargetEntity entityFromDb, TSourceEntity updatedEntity)
		where TTargetEntity : notnull
		where TSourceEntity : notnull
	{
		if (entityFromDb is IHasVersion entityWithVersion)
		{
			entityWithVersion.Version = Guid.NewGuid();

			if (updatedEntity is IHasVersionReadOnly entityWithVersionReadOnly)
				SetOriginalVersionQueried(entityFromDb, entityWithVersionReadOnly.Version);
		}
	}

	// Set queried entities version to the version of the updating entity to detect weather or not the data has changed
	// between getting the data in the first place and updating it now
	protected void SetOriginalVersionQueried<TTargetEntity>(TTargetEntity entityFromDb, Guid? originalVersion)
		where TTargetEntity : notnull
	{
		if (originalVersion is not null)
			DbContext.Entry(entityFromDb).OriginalValues[nameof(IHasVersion.Version)] = originalVersion;
	}

	protected async Task<CrudResult> HardDeleteAsync<TSoftDeleteEntity>(TKey id, Expression<Func<TSoftDeleteEntity, bool>>? canBeDeleted = null)
		where TSoftDeleteEntity : Entity<TKey>, ISoftDelete
	{
		TSoftDeleteEntity? entityToDelete = await DbContext.Set<TSoftDeleteEntity>().FirstOrDefaultAsync(WithId<TSoftDeleteEntity>(id));

		if (entityToDelete is null)
			return CrudResult.NotFound(id);

		if (canBeDeleted is not null && !canBeDeleted.Compile().Invoke(entityToDelete))
			return CrudResult.Fail("Entity can not be deleted. It is still in use.");

		DbContext.Set<TSoftDeleteEntity>().Remove(entityToDelete);

		await DbContext.SaveChangesAsync();

		return CrudResult.Ok();
	}

	protected async Task<bool> SaveChangesWithVersionCheckAsync()
	{
		try
		{
			await DbContext.SaveChangesAsync();
		}
		catch (DbUpdateConcurrencyException)
		{
			return false;
		}

		return true;
	}
}