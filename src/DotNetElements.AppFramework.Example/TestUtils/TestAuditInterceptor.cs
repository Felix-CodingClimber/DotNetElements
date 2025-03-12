using DotNetElements.AppFramework.Abstractions.Auth;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace DotNetElements.AppFramework.DebugEfCore;

// todo add options for full audit with history table
public sealed class TestAuditInterceptor : SaveChangesInterceptor
{
    private readonly TimeProvider timeProvider;
    private readonly ICurrentUserProvider currentUserProvider;

    public TestAuditInterceptor(TimeProvider timeProvider, ICurrentUserProvider currentUserProvider)
    {
        this.timeProvider = timeProvider;
        this.currentUserProvider = currentUserProvider;
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
    {
        if (eventData.Context is null)
            return base.SavingChangesAsync(eventData, result, cancellationToken);

        IEnumerable<EntityEntry<ICreationAuditedEntity>> addedOrModifiedEntities = eventData
            .Context
            .ChangeTracker
            .Entries<ICreationAuditedEntity>()
            .Where(e => e.State is EntityState.Added or EntityState.Modified);

        foreach (EntityEntry<ICreationAuditedEntity> auditedEntity in addedOrModifiedEntities)
        {
            if (auditedEntity.State is EntityState.Added)
            {
                Logger.Instance?.Log(LogType.Interceptor, $"Entity {auditedEntity.Entity.GetType().Name} is added");

                auditedEntity.Property(nameof(ICreationAuditedEntity.CreationTime)).CurrentValue = timeProvider.GetUtcNow();
                auditedEntity.Property(nameof(ICreationAuditedEntity.CreatorId)).CurrentValue = currentUserProvider.GetCurrentUserId();
            }
            else if (auditedEntity.State is EntityState.Modified && auditedEntity.Entity is IAuditedEntity)
            {
                Logger.Instance?.Log(LogType.Interceptor, $"Entity {auditedEntity.Entity.GetType().Name} is modified");

                auditedEntity.Property(nameof(IAuditedEntity.LastModificationTime)).CurrentValue = timeProvider.GetUtcNow();
                auditedEntity.Property(nameof(IAuditedEntity.LastModifierId)).CurrentValue = currentUserProvider.GetCurrentUserId();
            }
        }

		IEnumerable<EntityEntry<IDeletionAuditedEntity>> deletedEntities =
	        eventData
	        .Context
	        .ChangeTracker
	        .Entries<IDeletionAuditedEntity>()
	        .Where(e => e.State is EntityState.Deleted);

		foreach (EntityEntry<IDeletionAuditedEntity> deletionAuditedEntity in deletedEntities)
		{
            Logger.Instance?.Log(LogType.Interceptor, $"Entity {deletionAuditedEntity.Entity.GetType().Name} is deleted");

            deletionAuditedEntity.State = EntityState.Modified;
			deletionAuditedEntity.Entity.SetIsDeletedWithAudit(currentUserProvider.GetCurrentUserId(), timeProvider.GetUtcNow());
		}

		return base.SavingChangesAsync(eventData, result, cancellationToken);
    }
}
