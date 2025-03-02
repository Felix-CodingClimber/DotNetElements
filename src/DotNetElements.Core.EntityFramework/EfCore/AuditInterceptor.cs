using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace DotNetElements.Core.EntityFramework;

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

        IEnumerable<EntityEntry<ICreationAuditedEntity>> entities = eventData
            .Context
            .ChangeTracker
            .Entries<ICreationAuditedEntity>()
            .Where(e => e.State is EntityState.Added or EntityState.Modified);

        foreach (EntityEntry<ICreationAuditedEntity> entity in entities)
        {
            if (entity.State is EntityState.Added)
            {
                entity.Property(nameof(ICreationAuditedEntity.CreationTime)).CurrentValue = timeProvider.GetUtcNow();
                entity.Property(nameof(ICreationAuditedEntity.CreatorId)).CurrentValue = currentUserProvider.GetCurrentUserId();
            }
            else if (entity.State is EntityState.Modified && entity.Entity is IAuditedEntity)
            {
                entity.Property(nameof(IAuditedEntity.LastModificationTime)).CurrentValue = timeProvider.GetUtcNow();
                entity.Property(nameof(IAuditedEntity.LastModifierId)).CurrentValue = currentUserProvider.GetCurrentUserId();
            }
        }

        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }
}
