using System.Linq.Expressions;
using DotNetElements.AppFramework.Abstractions.Auth;
using DotNetElements.AppFramework.Abstractions.Entity;
using DotNetElements.AppFramework.Abstractions.Model;
using DotNetElements.AppFramework.Abstractions.ResultObject;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Logging;

namespace DotNetElements.AppFramework;

// todo why not use SaveChangesWithResultAsync in all methods that save changes?
// todo make sure BeginTransactionAsync is used in all inheriting services instead of the raw DbContext.Database.BeginTransactionAsync
// todo make sure GetCurrentUserId and GetUtcNow are used in all inheriting services instead of directly using CurrentUserProvider and TimeProvider
public abstract class ModuleService<TDbContext> : IEntityUpdateHelper
	where TDbContext : DbContext
{
	protected readonly TDbContext DbContext;
	protected readonly ICurrentUserProvider CurrentUserProvider;
	protected readonly TimeProvider TimeProvider;
	protected readonly ILogger<ModuleService<TDbContext>> Logger;

	protected ModuleService(TDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider, ILogger<ModuleService<TDbContext>> logger)
	{
		DbContext = dbContext;
		CurrentUserProvider = currentUserProvider;
		TimeProvider = timeProvider;
		Logger = logger;
	}

	// this should be high level method
	protected async Task AttachAndSaveChangesAsync<TEntity>(TEntity entity)
		where TEntity : class
	{
		DbContext.Set<TEntity>().Attach(entity);

		await DbContext.SaveChangesAsync();
	}

	// todo fix xml docs
	// todo this should be high level method
	/// <returns>
	/// The updated entity on success, or a failure result with one of the following errors:
	/// <see cref="CrudError.NotFound"/>, <see cref="CrudError.EntryDeleted"/>, or <see cref="CrudError.ConcurrencyConflict"/>.
	/// </returns>
	protected async Task<ApiResult<TEntity>> UpdateAndSaveChangesAsync<TEntity, TFrom>(TEntity? entity, TFrom from, Func<CrudError, ErrorDetails> errorMapper)
		where TEntity : class, IEntity, IUpdateFrom
	{
		if (entity is null)
		{
			Logger.LogDebug("Entity of type {EntityType} not found, can not update.", typeof(TEntity).Name);
			return Fail(errorMapper.Invoke(CrudError.NotFound));
		}

		if (entity is IDeletionAuditedEntity deletionAuditedEntity && deletionAuditedEntity.IsDeleted)
		{
			Logger.LogDebug("Entity with {EntityId} of type {EntityType} is marked as deleted, can not update.", entity.GetDebugId(), typeof(TEntity).Name);
			return Fail(errorMapper.Invoke(CrudError.EntryDeleted));
		}

		if (entity is IEntityHasVersion entityWithVersion && from is IHasVersion fromWithVersion && !EnsureVersion(fromWithVersion, entityWithVersion))
		{
			Logger.LogDebug("Concurrency conflict detected when trying to update entity with {EntityId} of type {EntityType}.", entity.GetDebugId(), typeof(TEntity).Name);
			return Fail(errorMapper.Invoke(CrudError.ConcurrencyConflict));
		}

		UpdateEntity(entity, from);

		ApiResult saveChangesResult = await SaveChangesWithResultAsync(errorMapper);

		if (saveChangesResult.HasError(out ErrorDetails error))
		{
			Logger.LogDebug("Failed to save changes when trying to update entity with {EntityId} of type {EntityType}. Error: {Error}.", entity.GetDebugId(), typeof(TEntity).Name, error);
			return Fail(error);
		}

		return entity;
	}

	// this should be low level method
	protected void UpdateEntity<TEntity, TFrom>(TEntity entity, TFrom from)
		where TEntity : IUpdateFrom
	{
		if (entity is IUpdateFrom<TFrom> updateFromEntity)
			updateFromEntity.Update(from);
		else if (entity is IUpdateFromEx<TFrom> updateFromEntityEx)
			updateFromEntityEx.Update(from, this);
		else
			throw new InvalidOperationException($"Entity {entity.GetType().Name} does not implement IUpdateFrom<{typeof(TFrom).Name}> or IUpdateFromEx<{typeof(TFrom).Name}>");
	}

	// this should be high level method
	protected Task<ApiResult> RemoveByIdAndSaveChangesAsync<TEntity>(Guid id, Func<CrudError, ErrorDetails> errorMapper)
		where TEntity : class, IEntity<Guid>
	{
		return RemoveByIdAndSaveChangesAsync<TEntity, Guid>(id, errorMapper);
	}

	// this should be high level method
	protected Task<ApiResult> RemoveByIdAndSaveChangesAsync<TEntity>(int id, Func<CrudError, ErrorDetails> errorMapper)
		where TEntity : class, IEntity<int>
	{
		return RemoveByIdAndSaveChangesAsync<TEntity, int>(id, errorMapper);
	}

	protected async Task<ApiResult> RemoveByIdAndSaveChangesAsync<TEntity, TKey>(TKey id, Func<CrudError, ErrorDetails> errorMapper)
		where TEntity : class, IEntity<TKey>
		where TKey : notnull, IEquatable<TKey>
	{
		DbSet<TEntity> dbSet = DbContext.Set<TEntity>();

		TEntity? existingEntity = await dbSet
			.FindAsync(id);

		if (existingEntity is null)
		{
			Logger.LogDebug("Entity with id {EntityId} of type {EntityType} not found, can not remove.", id, typeof(TEntity).Name);
			return Fail(errorMapper.Invoke(CrudError.NotFound));
		}

		if (existingEntity is IDeletionAuditedEntity deletionAuditedEntity && deletionAuditedEntity.IsDeleted)
		{
			Logger.LogDebug("Entity with id {EntityId} of type {EntityType} is marked as deleted, can not remove.", id, typeof(TEntity).Name);
			return Fail(errorMapper.Invoke(CrudError.EntryDeleted));
		}

		dbSet.Remove(existingEntity);

		await DbContext.SaveChangesAsync();

		return Ok();
	}

	// this should be high level method
	protected Task<ApiResult<CreationAuditedModelDetails>> GetCreationAuditedDetailsByEntityId<TEntity>(Guid id, Func<CrudError, ErrorDetails> errorMapper)
		where TEntity : class, IEntity<Guid>, ICreationAuditedEntity
	{
		return GetCreationAuditedDetailsByEntityId<TEntity, Guid>(id, errorMapper);
	}

	// this should be high level method
	protected Task<ApiResult<CreationAuditedModelDetails>> GetCreationAuditedDetailsByEntityId<TEntity>(int id, Func<CrudError, ErrorDetails> errorMapper)
		where TEntity : class, IEntity<int>, ICreationAuditedEntity
	{
		return GetCreationAuditedDetailsByEntityId<TEntity, int>(id, errorMapper);
	}

	// this should be low level method
	protected async Task<ApiResult<CreationAuditedModelDetails>> GetCreationAuditedDetailsByEntityId<TEntity, TKey>(TKey id, Func<CrudError, ErrorDetails> errorMapper)
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

		if (details is null)
		{
			Logger.LogDebug("Entity with id {EntityId} of type {EntityType} not found, can not get creation audited details.", id, typeof(TEntity).Name);
			return Fail(errorMapper.Invoke(CrudError.NotFound));
		}

		return details;
	}

	// this should be high level method
	protected Task<ApiResult<AuditedModelDetails>> GetAuditedDetailsByEntityId<TEntity>(Guid id, Func<CrudError, ErrorDetails> errorMapper)
		where TEntity : class, IEntity<Guid>, IAuditedEntity
	{
		return GetAuditedDetailsByEntityId<TEntity, Guid>(id, errorMapper);
	}

	// this should be high level method
	protected Task<ApiResult<AuditedModelDetails>> GetAuditedDetailsByEntityId<TEntity>(int id, Func<CrudError, ErrorDetails> errorMapper)
		where TEntity : class, IEntity<int>, IAuditedEntity
	{
		return GetAuditedDetailsByEntityId<TEntity, int>(id, errorMapper);
	}

	// this should be low level method
	protected async Task<ApiResult<AuditedModelDetails>> GetAuditedDetailsByEntityId<TEntity, TKey>(TKey id, Func<CrudError, ErrorDetails> errorMapper)
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

		if (details is null)
		{
			Logger.LogDebug("Entity with id {EntityId} of type {EntityType} not found, can not get audited details.", id, typeof(TEntity).Name);
			return Fail(errorMapper.Invoke(CrudError.NotFound));
		}

		return details;
	}

	// this should be high level method
	protected Task<ApiResult<DeletionAuditedModelDetails>> GetDeletionAuditedDetailsByEntityId<TEntity>(Guid id, Func<CrudError, ErrorDetails> errorMapper)
		where TEntity : class, IEntity<Guid>, IDeletionAuditedEntity
	{
		return GetDeletionAuditedDetailsByEntityId<TEntity, Guid>(id, errorMapper);
	}

	// this should be high level method
	protected Task<ApiResult<DeletionAuditedModelDetails>> GetDeletionAuditedDetailsByEntityId<TEntity>(int id, Func<CrudError, ErrorDetails> errorMapper)
		where TEntity : class, IEntity<int>, IDeletionAuditedEntity
	{
		return GetDeletionAuditedDetailsByEntityId<TEntity, int>(id, errorMapper);
	}

	// this should be low level method
	protected async Task<ApiResult<DeletionAuditedModelDetails>> GetDeletionAuditedDetailsByEntityId<TEntity, TKey>(TKey id, Func<CrudError, ErrorDetails> errorMapper)
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

		if (details is null)
		{
			Logger.LogDebug("Entity with id {EntityId} of type {EntityType} not found, can not get deletion audited details.", id, typeof(TEntity).Name);
			return Fail(errorMapper.Invoke(CrudError.NotFound));
		}

		return details;
	}

	// this should be low level method
	// todo use this in all methods that save changes and return CrudResult, to ensure consistent error handling for concurrency conflicts
	protected async Task<ApiResult> SaveChangesWithResultAsync(Func<CrudError, ErrorDetails> errorMapper)
	{
		try
		{
			await DbContext.SaveChangesAsync();

			return Ok();
		}
		catch (DbUpdateConcurrencyException ex)
		{
			Logger.LogDebug(ex, "Concurrency conflict detected during SaveChanges.");

			return Fail(errorMapper.Invoke(CrudError.ConcurrencyConflict));
		}
	}

	// this should be low level method
	protected TRelatedEntity AttachById<TRelatedEntity, TKey>(TKey id, bool checkAlreadyTracked)
		where TRelatedEntity : Entity<TKey>
		where TKey : notnull, IEquatable<TKey>
	{
		if (checkAlreadyTracked)
		{
			EntityEntry? existingEntity = DbContext.ChangeTracker.Entries().FirstOrDefault(entity => entity.Entity is TRelatedEntity relatedEntity && relatedEntity.Id.Equals(id));

			if (existingEntity is not null)
				return (TRelatedEntity)existingEntity.Entity;
		}

		return DbContext.Set<TRelatedEntity>().Attach(EntityHelper.CreateRefById<TRelatedEntity, TKey>(id)).Entity;
	}

	// this should be low level method
	// todo check generic constraints
	protected bool EnsureVersion<TModel, TEntity>(TModel model, TEntity existingEntity)
		where TModel : class, IHasVersion
		where TEntity : class, IEntityHasVersion
	{
		if (model.Version != existingEntity.Version)
		{
			Logger.LogDebug("Version mismatch detected. Model of type {ModelType} version: {ModelVersion}, Entity of type {EntityType} version: {EntityVersion}.",
				typeof(TModel).Name, model.Version, typeof(TEntity).Name, existingEntity.Version);

			return false;
		}

		existingEntity.UpdateVersion();

		return true;
	}

	// this should be low level method
	protected async Task<bool> EnsureNoDuplicateAsync<TEntity>(Expression<Func<TEntity, bool>> checkDuplicate)
		where TEntity : class
	{
		bool hasDuplicate = await DbContext.Set<TEntity>().AnyAsync(checkDuplicate);

		return !hasDuplicate;
	}

	// this should be low level method
	protected Task LoadRelatedAsync<TEntity, TRelatedEntity>(TEntity entity, Expression<Func<TEntity, TRelatedEntity?>> navigationProperty)
		where TEntity : class
		where TRelatedEntity : class
	{
		return DbContext.Entry(entity).Reference(navigationProperty).LoadAsync();
	}

	// this should be low level method
	protected void SetIsModified<TEntity, TProperty>(TEntity entity, Expression<Func<TEntity, TProperty?>> property, bool isModified = true)
		where TEntity : class
		where TProperty : class
	{
		DbContext.Entry(entity).Property(property).IsModified = isModified;
	}

	// this should be high level method
	protected Task<IDbContextTransaction> BeginTransactionAsync()
	{
		return DbContext.Database.BeginTransactionAsync();
	}

	// this should be high level method
	protected Guid GetCurrentUserId()
	{
		return CurrentUserProvider.GetCurrentUserId();
	}

	// this should be high level method
	protected DateTimeOffset GetUtcNow()
	{
		return TimeProvider.GetUtcNow();
	}

	// IEntityUpdateHelper implementation
	TRelatedEntity IEntityUpdateHelper.AttachById<TRelatedEntity, TKey>(TKey id, bool checkAlreadyTracked)
	{
		return AttachById<TRelatedEntity, TKey>(id, checkAlreadyTracked);
	}

	Guid IEntityUpdateHelper.GetCurrentUserId()
	{
		return GetCurrentUserId();
	}

	DateTimeOffset IEntityUpdateHelper.GetUtcNow()
	{
		return GetUtcNow();
	}
}
