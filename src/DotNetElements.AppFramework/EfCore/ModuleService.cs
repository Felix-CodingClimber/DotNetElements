using System.Linq.Expressions;
using DotNetElements.AppFramework.Abstractions.Auth;
using DotNetElements.AppFramework.Abstractions.Model;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage;

namespace DotNetElements.AppFramework;

public abstract class ModuleService<TDbContext> : IEntityUpdateHelper
    where TDbContext : DbContext
{
    protected readonly TDbContext DbContext;
    protected readonly ICurrentUserProvider CurrentUserProvider;
    protected readonly TimeProvider TimeProvider;

    protected ModuleService(TDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider)
    {
        DbContext = dbContext;
        CurrentUserProvider = currentUserProvider;
        TimeProvider = timeProvider;
    }

    // this should be high level method
    protected async Task<int> AttachAndSaveChangesAsync<TEntity>(TEntity entity)
        where TEntity : class
    {
        DbContext.Set<TEntity>().Attach(entity);

        return await DbContext.SaveChangesAsync();
    }

    // this should be high level method
    protected async Task<CrudResult> AttachAndSaveChangesAsync<TEntity>(TEntity entity, Expression<Func<TEntity, bool>> checkDuplicate)
        where TEntity : class
    {
        if (!await EnsureNoDuplicateAsync<TEntity>(checkDuplicate))
            return Fail(CrudError.DuplicateEntry);

        DbContext.Set<TEntity>().Attach(entity);

        await DbContext.SaveChangesAsync();

        return CrudResult.Ok(); // todo remove CrudResult. when Result package is updated
    }

    // this should be high level method
    protected async Task<CrudResult<TEntity>> UpdateAndSaveChangesAsync<TEntity, TFrom>(TEntity? entity, TFrom from)
        where TEntity : Entity, IUpdateFrom
    {
        if (entity is null)
            return Fail(CrudError.NotFound);

        if (entity is IDeletionAuditedEntity deletionAuditedEntity && deletionAuditedEntity.IsDeleted)
            return Fail(CrudError.EntryDeleted);

        if (entity is IEntityHasVersion entityWithVersion && from is IHasVersion fromWithVersion && !EnsureVersion(fromWithVersion, entityWithVersion))
            return Fail(CrudError.ConcurrencyConflict);

        UpdateEntity(entity, from);

        await DbContext.SaveChangesAsync();

        return entity;
    }

    // this should be low level method
    protected void UpdateEntity<TEntity, TFrom>(TEntity entity, TFrom from)
        where TEntity : Entity, IUpdateFrom
    {
        if (entity is IUpdateFrom<TFrom> updateFromEntity)
            updateFromEntity.Update(from);
        else if (entity is IUpdateFromEx<TFrom> updateFromEntityEx)
            updateFromEntityEx.Update(from, this);
        else
            throw new InvalidOperationException($"Entity {entity.GetType().Name} does not implement IUpdateFrom<{typeof(TFrom).Name}> or IUpdateFromEx<{typeof(TFrom).Name}>");
    }

    // this should be high level method
    protected Task<CrudResult> RemoveByIdAndSaveChangesAsync<TEntity>(Guid id)
        where TEntity : class, IEntity<Guid>
    {
        return RemoveByIdAndSaveChangesAsync<TEntity, Guid>(id);
    }

    // this should be high level method
    protected Task<CrudResult> RemoveByIdAndSaveChangesAsync<TEntity>(int id)
        where TEntity : class, IEntity<int>
    {
        return RemoveByIdAndSaveChangesAsync<TEntity, int>(id);
    }

    // this should be low level method
    protected async Task<CrudResult> RemoveByIdAndSaveChangesAsync<TEntity, TKey>(TKey id)
        where TEntity : class, IEntity<TKey>
        where TKey : notnull, IEquatable<TKey>
    {
        DbSet<TEntity> dbSet = DbContext.Set<TEntity>();

        TEntity? existingEntity = await dbSet
            .FindAsync(id);

        if (existingEntity is null)
            return Fail(CrudError.NotFound);

        if (existingEntity is IDeletionAuditedEntity deletionAuditedEntity && deletionAuditedEntity.IsDeleted)
            return Fail(CrudError.EntryDeleted);

        dbSet.Remove(existingEntity);

        await DbContext.SaveChangesAsync();

        return CrudResult.Ok(); // todo remove CrudResult. when Result package is updated
    }

    // this should be high level method
    protected Task<CrudResult<CreationAuditedModelDetails>> GetCreationAuditedDetailsByEntityId<TEntity>(Guid id)
        where TEntity : class, IEntity<Guid>, ICreationAuditedEntity
    {
        return GetCreationAuditedDetailsByEntityId<TEntity, Guid>(id);
    }

    // this should be high level method
    protected Task<CrudResult<CreationAuditedModelDetails>> GetCreationAuditedDetailsByEntityId<TEntity>(int id)
        where TEntity : class, IEntity<int>, ICreationAuditedEntity
    {
        return GetCreationAuditedDetailsByEntityId<TEntity, int>(id);
    }

    // this should be low level method
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

        return OkIfNotNull(details, CrudError.NotFound);
    }

    // this should be high level method
    protected Task<CrudResult<AuditedModelDetails>> GetAuditedDetailsByEntityId<TEntity>(Guid id)
        where TEntity : class, IEntity<Guid>, IAuditedEntity
    {
        return GetAuditedDetailsByEntityId<TEntity, Guid>(id);
    }

    // this should be high level method
    protected Task<CrudResult<AuditedModelDetails>> GetAuditedDetailsByEntityId<TEntity>(int id)
        where TEntity : class, IEntity<int>, IAuditedEntity
    {
        return GetAuditedDetailsByEntityId<TEntity, int>(id);
    }

    // this should be low level method
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

        return OkIfNotNull(details, CrudError.NotFound);
    }

    // this should be high level method
    protected Task<CrudResult<DeletionAuditedModelDetails>> GetDeletionAuditedDetailsByEntityId<TEntity>(Guid id)
        where TEntity : class, IEntity<Guid>, IDeletionAuditedEntity
    {
        return GetDeletionAuditedDetailsByEntityId<TEntity, Guid>(id);
    }

    // this should be high level method
    protected Task<CrudResult<DeletionAuditedModelDetails>> GetDeletionAuditedDetailsByEntityId<TEntity>(int id)
        where TEntity : class, IEntity<int>, IDeletionAuditedEntity
    {
        return GetDeletionAuditedDetailsByEntityId<TEntity, int>(id);
    }

    // this should be low level method
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

        return OkIfNotNull(details, CrudError.NotFound);
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
            return false;

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
