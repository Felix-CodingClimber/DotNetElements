using System.Linq.Expressions;

namespace BlazorCrud.Core;

public abstract class Repository<TDbContext, TEntity, TEditModel, TKey> : ReadOnlyRepository<TDbContext, TEntity, TKey>, IRepository<TEntity, TEditModel, TKey>
	where TDbContext : DbContext
	where TEntity : Entity<TKey>, IUpdatableFromModel<TEditModel>
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

	public virtual async Task<Result<TSelf>> CreateOrUpdateAsync<TSelf>(TKey id, TSelf entity)
		where TSelf : Entity<TKey>, IUpdatableFromSelf<TSelf>
	{
		// If id is not set yet, the entity must be new
		if (id.Equals(default(TKey)))
			return await CreateFromSelfAsync(entity);

		return await UpdateFromSelfAsync(entity.Id, entity);
	}

	private async Task<Result<TSelf>> CreateFromSelfAsync<TSelf>(TSelf entity)
		where TSelf : Entity<TKey>, IUpdatableFromSelf<TSelf>
	{
		ArgumentNullException.ThrowIfNull(entity);

		// Set audit properties if needed
		if (entity is ICreationAuditedEntity auditedEntity)
			auditedEntity.SetCreationAudited(CurrentUserProvider.GetCurrentUserId(), TimeProvider.GetUtcNow());

		var createdEntity = await DbContext.Set<TSelf>().AddAsync(entity);

		await DbContext.SaveChangesAsync();

		return createdEntity.Entity;
	}

	public virtual async Task<Result<TSelf>> UpdateFromSelfAsync<TSelf>(TKey id, TSelf from)
		where TSelf : Entity<TKey>, IUpdatableFromSelf<TSelf>
	{
		TSelf? entity = await DbContext.Set<TSelf>().FirstOrDefaultAsync(entity => entity.Id.Equals(id));

		if (entity is null)
			return Result.EntityNotFound(id);

		entity.Update(from);

		// Check if entity has changed and set audit properties if needed
		if (DbContext.ChangeTracker.HasChanges())
		{
			if (entity is IAuditedEntity auditedEntity)
				auditedEntity.SetModificationAudited(CurrentUserProvider.GetCurrentUserId(), TimeProvider.GetUtcNow());

			await DbContext.SaveChangesAsync();
		}

		return entity;
	}

	public virtual async Task<Result<TEntity>> UpdateAsync(TKey id, TEditModel from)
	{
		TEntity? entity = await Entities.FirstOrDefaultAsync(WithId(id));

		if (entity is null)
			return Result.EntityNotFound(id);

		entity.Update(from);

		// Check if entity has changed and set audit properties if needed
		if (DbContext.ChangeTracker.HasChanges())
		{
			if (entity is IAuditedEntity auditedEntity)
				auditedEntity.SetModificationAudited(CurrentUserProvider.GetCurrentUserId(), TimeProvider.GetUtcNow());

			await DbContext.SaveChangesAsync();
		}

		return entity;
	}

	public virtual async Task<Result> DeleteAsync(TKey id)
	{
		TEntity? entityToDelete = await Entities.FirstOrDefaultAsync(WithId(id));

		if (entityToDelete is null)
			return Result.EntityNotFound(id);

		if (entityToDelete is IDeletionAuditedEntity deletionAuditedEntity)
		{
			deletionAuditedEntity.Delete(CurrentUserProvider.GetCurrentUserId(), TimeProvider.GetUtcNow());
		}
		else if (entityToDelete is IHasDeletionTime entityWithDeletionTime)
		{
			entityWithDeletionTime.Delete(TimeProvider.GetUtcNow());
		}
		else if (entityToDelete is ISoftDelete softDeletableEntity)
		{
			softDeletableEntity.Delete();
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

	protected virtual async Task<Result> HardDeleteAsync<TSelf>(TKey id, Expression<Func<TEntity, bool>>? canBeDeleted = null)
		where TSelf : TEntity, ISoftDelete
	{
		TEntity? entityToDelete = await Entities.FirstOrDefaultAsync(WithId(id));

		if (entityToDelete is null)
			return Result.EntityNotFound(id);

		if (canBeDeleted is not null && !canBeDeleted.Compile().Invoke(entityToDelete))
			return Result.Fail("Entity can not be deleted. It is still in use.");

		Entities.Remove(entityToDelete);

		await DbContext.SaveChangesAsync();

		return Result.Ok();
	}
}