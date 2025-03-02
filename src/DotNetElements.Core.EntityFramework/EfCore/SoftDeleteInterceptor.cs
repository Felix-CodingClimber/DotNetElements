using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace DotNetElements.Core.EntityFramework;

public sealed class SoftDeleteInterceptor : SaveChangesInterceptor
{
    private readonly TimeProvider timeProvider;
    private readonly ICurrentUserProvider currentUserProvider;

    public SoftDeleteInterceptor(TimeProvider timeProvider, ICurrentUserProvider currentUserProvider)
    {
        this.timeProvider = timeProvider;
        this.currentUserProvider = currentUserProvider;
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
    {
        if (eventData.Context is null)
            return base.SavingChangesAsync(eventData, result, cancellationToken);

        IEnumerable<EntityEntry<IDeletionAuditedEntity>> entries =
            eventData
            .Context
            .ChangeTracker
            .Entries<IDeletionAuditedEntity>()
            .Where(e => e.State is EntityState.Deleted);

        foreach (EntityEntry<IDeletionAuditedEntity> softDeletable in entries)
        {
            softDeletable.State = EntityState.Modified;
            softDeletable.Entity.SetIsDeletedWithAudit(currentUserProvider.GetCurrentUserId(), timeProvider.GetUtcNow());
        }

        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }
}
