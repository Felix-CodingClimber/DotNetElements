using System.Linq.Expressions;
using System.Reflection;

namespace BlazorCrud.Core;

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

	public virtual async Task<Result<TEntity>> CreateAsync(TEntity entity, Expression<Func<TEntity, bool>>? checkDuplicate = null)
	{
		ArgumentNullException.ThrowIfNull(entity);

		if (checkDuplicate is not null)
		{
			bool isDuplicate = await Entities.AnyAsync(checkDuplicate);

			if (isDuplicate)
				return Result.DuplicateEntity();
		}

		// Set audit properties if needed
		if (entity is ICreationAuditedEntity auditedEntity)
			auditedEntity.SetCreationAudited(CurrentUserProvider.GetCurrentUserId(), TimeProvider.GetUtcNow());

		var createdEntity = Entities.Attach(entity);

		await DbContext.SaveChangesAsync();

		return createdEntity.Entity;
	}

	public virtual async Task<Result<TSelf>> CreateOrUpdateAsync<TSelf>(TKey id, TSelf entity, Expression<Func<TSelf, bool>>? checkDuplicate = null)
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
					return Result.DuplicateEntity();
			}

			// Set audit properties if needed
			if (entity is ICreationAuditedEntity auditedEntity)
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
				return Result.EntityNotFound(id);

			entity.Update(entity, this);

			// Check if entity has changed and set audit properties if needed
			if (DbContext.ChangeTracker.HasChanges())
			{
				if (existingEntity is IAuditedEntity auditedEntity)
					auditedEntity.SetModificationAudited(CurrentUserProvider.GetCurrentUserId(), TimeProvider.GetUtcNow());

				if (existingEntity is IHasVersion entityWithVersion)
					entityWithVersion.Version = Guid.NewGuid();

				await DbContext.SaveChangesAsync();
			}

			return existingEntity;
		}
	}

	public virtual async Task<Result<TUpdatableEntity>> UpdateAsync<TUpdatableEntity, TFrom>(TKey id, TFrom from)
		where TUpdatableEntity : Entity<TKey>, IUpdatable<TFrom>
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
			return Result.EntityNotFound(id);

		existingEntity.Update(from, this);

		// Check if entity has changed and set audit properties if needed
		if (DbContext.ChangeTracker.HasChanges())
		{
			if (existingEntity is IAuditedEntity auditedEntity)
				auditedEntity.SetModificationAudited(CurrentUserProvider.GetCurrentUserId(), TimeProvider.GetUtcNow());

			if (existingEntity is IHasVersion entityWithVersion)
				entityWithVersion.Version = Guid.NewGuid();

			await DbContext.SaveChangesAsync();
		}

		return existingEntity;
	}

	public virtual async Task<Result> DeleteAsync(TKey id)
	{
		TEntity? entityToDelete = await Entities.FirstOrDefaultAsync(WithId(id));

		if (entityToDelete is null)
			return Result.EntityNotFound(id);

		if (entityToDelete is IDeletionAuditedEntity deletionAuditedEntity)
		{
			deletionAuditedEntity.Delete(CurrentUserProvider.GetCurrentUserId(), TimeProvider.GetUtcNow());

			if (entityToDelete is IHasVersion entityWithVersion)
				entityWithVersion.Version = Guid.NewGuid();
		}
		else if (entityToDelete is IHasDeletionTime entityWithDeletionTime)
		{
			entityWithDeletionTime.Delete(TimeProvider.GetUtcNow());

			if (entityToDelete is IHasVersion entityWithVersion)
				entityWithVersion.Version = Guid.NewGuid();
		}
		else if (entityToDelete is ISoftDelete softDeletableEntity)
		{
			softDeletableEntity.Delete();

			if (entityToDelete is IHasVersion entityWithVersion)
				entityWithVersion.Version = Guid.NewGuid();
		}
		else
		{
			Entities.Remove(entityToDelete);
		}

		await DbContext.SaveChangesAsync();

		return Result.Ok();
	}

	public virtual async Task ClearTable()
	{
		await Entities.ExecuteDeleteAsync();
	}

	public TRelatedEntity AttachById<TRelatedEntity, TRelatedEntityKey>(TRelatedEntityKey id)
		where TRelatedEntity : Entity<TRelatedEntityKey>, IRelatedEntity<TRelatedEntity, TRelatedEntityKey>
		where TRelatedEntityKey : notnull
	{
		return DbContext.Set<TRelatedEntity>().Attach(TRelatedEntity.CreateRefById(id)).Entity;
	}

	protected async Task<Result> HardDeleteAsync<TSoftDeleteEntity>(TKey id, Expression<Func<TSoftDeleteEntity, bool>>? canBeDeleted = null)
		where TSoftDeleteEntity : Entity<TKey>, ISoftDelete
	{
		TSoftDeleteEntity? entityToDelete = await DbContext.Set<TSoftDeleteEntity>().FirstOrDefaultAsync(WithId<TSoftDeleteEntity>(id));

		if (entityToDelete is null)
			return Result.EntityNotFound(id);

		if (canBeDeleted is not null && !canBeDeleted.Compile().Invoke(entityToDelete))
			return Result.Fail("Entity can not be deleted. It is still in use.");

		DbContext.Set<TSoftDeleteEntity>().Remove(entityToDelete);

		await DbContext.SaveChangesAsync();

		return Result.Ok();
	}
}