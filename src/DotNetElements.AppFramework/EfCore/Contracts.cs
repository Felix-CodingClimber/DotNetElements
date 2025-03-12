namespace DotNetElements.AppFramework;

public interface IEntityUpdateHelper
{
    TRelatedEntity AttachById<TRelatedEntity, TKey>(TKey id, bool checkAlreadyTracked = false)
        where TRelatedEntity : Entity<TKey>
        where TKey : notnull, IEquatable<TKey>;

    Guid GetCurrentUserId();

    DateTimeOffset GetUtcNow();

    void UpdateRelatedEntities<TEntity, TKey>(List<TEntity> oldCollection, IEnumerable<TKey> newIdsCollection)
        where TEntity : Entity<TKey>
        where TKey : notnull, IEquatable<TKey>
    {
        EntityHelper.UpdateRelatedEntities<TEntity, TKey>(oldCollection, newIdsCollection, this);
    }
}

