using DotNetElements.AppFramework.Abstractions.Entity;

namespace DotNetElements.AppFramework;

public abstract class Entity { }

public abstract class Entity<TKey> : Entity, IEntity<TKey>
    where TKey : notnull, IEquatable<TKey>
{
    public TKey Id { get; protected set; } = default!;

    internal void SetId(TKey id)
    {
        // todo check if this is needed
        // check if we can make the setter init only and use reflection to set the value
        if (!Id.Equals(default))
            throw new InvalidOperationException("Can not set Id of a already created entity");

        Id = id;
    }
}

public class CreationAuditedEntity<TKey> : Entity<TKey>, ICreationAuditedEntity
    where TKey : notnull, IEquatable<TKey>
{
    public Guid CreatorId { get; private set; }

    public DateTimeOffset CreationTime { get; private set; }

    public void SetCreationAudited(Guid creatorId, DateTimeOffset creationTime)
    {
        if (CreatorId != default)
            throw new InvalidOperationException("Can not set audit parameters of a already created entity");

        CreatorId = creatorId;
        CreationTime = creationTime;
    }
}

public class AuditedEntity<TKey> : CreationAuditedEntity<TKey>, IAuditedEntity
    where TKey : notnull, IEquatable<TKey>
{
    public Guid? LastModifierId { get; private set; }

    public DateTimeOffset? LastModificationTime { get; private set; }

    public void SetModificationAudited(Guid lastModifierId, DateTimeOffset lastModificationTime)
    {
        LastModifierId = lastModifierId;
        LastModificationTime = lastModificationTime;
    }
}

public class DeletionAuditedEntity<TKey> : AuditedEntity<TKey>, IDeletionAuditedEntity
    where TKey : notnull, IEquatable<TKey>
{
    public bool IsDeleted { get; private set; }

    public Guid? DeleterId { get; private set; }

    public DateTimeOffset? DeletionTime { get; private set; }

    public void SetIsDeletedWithAudit(Guid deleterId, DateTimeOffset deletionTime)
    {
        if (IsDeleted)
            throw new InvalidOperationException("Can not delete an already deleted entity");

        IsDeleted = true;
        DeleterId = deleterId;
        DeletionTime = deletionTime;
    }
}