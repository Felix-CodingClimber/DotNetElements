using System.Runtime.CompilerServices;
using DotNetElements.AppFramework.Abstractions.Model;

namespace DotNetElements.AppFramework.Abstractions.Entity;

public static class EntityHelper
{
    // Single entities 
    public static TEntity CreateRefById<TEntity>(Guid id)
        where TEntity : Entity<Guid>
    {
        return CreateRefById<TEntity, Guid>(id);
    }

    public static TEntity CreateRefById<TEntity>(int id)
        where TEntity : Entity<int>
    {
        return CreateRefById<TEntity, int>(id);
    }

    public static TEntity CreateRefById<TEntity, TKey>(TKey id)
        where TEntity : Entity<TKey>
        where TKey : notnull, IEquatable<TKey>
    {
        TEntity entity = (TEntity)RuntimeHelpers.GetUninitializedObject(typeof(TEntity));
        entity.SetId(id);

        return entity;
    }

    // List of entities 
    public static List<TEntity> CreateRefsById<TEntity>(IEnumerable<Guid> ids)
        where TEntity : Entity<Guid>
    {
        return CreateRefsById<TEntity, Guid>(ids);
    }

    public static List<TEntity> CreateRefsById<TEntity>(IEnumerable<int> ids)
        where TEntity : Entity<int>
    {
        return CreateRefsById<TEntity, int>(ids);
    }

    public static List<TEntity> CreateRefsById<TEntity, TKey>(IEnumerable<TKey> ids)
        where TEntity : Entity<TKey>
        where TKey : notnull, IEquatable<TKey>
    {
        return ids.Select(id =>
        {
            TEntity entity = (TEntity)RuntimeHelpers.GetUninitializedObject(typeof(TEntity));
            entity.SetId(id);

            return entity;
        }).ToList();
    }

    // [DevHint]
    // It is really important that we attach the newly added entity first, before adding it to the collection.
    // Otherwise ef core would track the entity as modified, and we would get an exception when trying to save the changes.
    public static void UpdateRelatedEntities<TEntity, TKey>(List<TEntity> oldCollection, IEnumerable<TKey> newIdsCollection, IEntityUpdateHelper entityUpdateHelper)
        where TEntity : Entity<TKey>
        where TKey : notnull, IEquatable<TKey>
    {
        oldCollection.RemoveAll(existingEntity => !newIdsCollection.Any(newId => newId.Equals(existingEntity.Id)));

        IEnumerable<TKey> addedIds = newIdsCollection.Where(newId => !oldCollection.Any(existingEntity => existingEntity.Id.Equals(newId)));

        foreach (TKey newId in addedIds)
            oldCollection.Add(entityUpdateHelper.AttachById<TEntity, TKey>(newId));
    }
}
