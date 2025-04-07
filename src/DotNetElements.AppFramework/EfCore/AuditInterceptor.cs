using DotNetElements.AppFramework.Abstractions.Auth;
using DotNetElements.AppFramework.Abstractions.Entity;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace DotNetElements.AppFramework;

// todo add options for full audit with history table
public sealed class AuditInterceptor : SaveChangesInterceptor
{
    private readonly TimeProvider timeProvider;
    private readonly ICurrentUserProvider currentUserProvider;

    public AuditInterceptor(TimeProvider timeProvider, ICurrentUserProvider currentUserProvider)
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
                auditedEntity.Property(nameof(ICreationAuditedEntity.CreationTime)).CurrentValue = timeProvider.GetUtcNow();
                auditedEntity.Property(nameof(ICreationAuditedEntity.CreatorId)).CurrentValue = currentUserProvider.GetCurrentUserId();
            }
            else if (auditedEntity.State is EntityState.Modified && auditedEntity.Entity is IAuditedEntity)
            {
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
			deletionAuditedEntity.State = EntityState.Modified;
			deletionAuditedEntity.Entity.SetIsDeletedWithAudit(currentUserProvider.GetCurrentUserId(), timeProvider.GetUtcNow());
		}

		return base.SavingChangesAsync(eventData, result, cancellationToken);
    }
}
