namespace DotNetElements.AppFramework;

public interface IEntity<TKey> : IHasKey<TKey>
    where TKey : notnull, IEquatable<TKey>;

public interface ICreationAuditedEntity
{
    Guid CreatorId { get; }
    DateTimeOffset CreationTime { get; }

    void SetCreationAudited(Guid creatorId, DateTimeOffset creationTime);
}

public interface IAuditedEntity : ICreationAuditedEntity
{
    Guid? LastModifierId { get; }
    DateTimeOffset? LastModificationTime { get; }

    bool HasChanged => LastModificationTime is null;

    void SetModificationAudited(Guid lastModifierId, DateTimeOffset lastModificationTime);
}

public interface IDeletionAuditedEntity : IAuditedEntity
{
    bool IsDeleted { get; }
    Guid? DeleterId { get; }
    DateTimeOffset? DeletionTime { get; }

    void SetIsDeletedWithAudit(Guid deleterId, DateTimeOffset deletionTime);
}

// todo implement code analyzer to detect missing attribute
// - https://stackoverflow.com/questions/74377235/how-can-i-detect-missing-attributes-on-a-method-with-roslyn-code-analyser
// - https://medium.com/@niteshsinghal85/custom-code-analyzer-to-detect-usage-of-allowanonymous-attribute-in-c-a225a81ab2b4

/// <summary>
/// To make use of Ef Cores concurrency check, add a <see cref="ConcurrencyCheckAttribute"/> to the property.
/// </summary>
public interface IEntityHasVersion
{
    Guid Version { get; }

    void UpdateVersion();

    static Guid GetUpdatedVersion() => Guid.NewGuid();
}

public interface IUpdateFrom;

public interface IUpdateFrom<TFrom> : IUpdateFrom
{
    void Update(TFrom from);
}

public interface IUpdateFromEx<TFrom> : IUpdateFrom
{
    void Update(TFrom from, IEntityUpdateHelper entityUpdateHelper);
}
