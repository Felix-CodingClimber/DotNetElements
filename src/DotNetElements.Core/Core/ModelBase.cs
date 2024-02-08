namespace DotNetElements.Core;

public interface IModel<TKey> : IHasKey<TKey>
    where TKey : notnull, IEquatable<TKey>;

public interface IEditModel<TModel, TKey>
    where TModel : Model<TKey>
    where TKey : notnull, IEquatable<TKey>;

public abstract class Model<TKey> : IModel<TKey>
    where TKey : notnull, IEquatable<TKey>
{
    public TKey Id { get; private init; }

    protected Model(TKey id)
    {
        Id = id;
    }
}

public abstract class VersionedModel<TKey> : Model<TKey>, IHasVersionReadOnly
    where TKey : notnull, IEquatable<TKey>
{
    public Guid Version { get; protected set; }

    protected VersionedModel(TKey id, Guid version) : base(id)
    {
        Version = version;
    }
}

public abstract class EditModel<TModel, TKey> : IEditModel<TModel, TKey>
    where TModel : Model<TKey>
    where TKey : notnull, IEquatable<TKey>
{
    public TKey Id { get; init; }

#nullable disable
    protected EditModel() { }
#nullable enable

    protected EditModel(TKey id)
    {
        Id = id;
    }
}

public abstract class VersionedEditModel<TModel, TKey> : EditModel<TModel, TKey>
    where TModel : VersionedModel<TKey>
    where TKey : notnull, IEquatable<TKey>
{
    public Guid Version { get; protected set; }

    protected VersionedEditModel(Guid version) : base(default!)
    {
        Version = version;
    }

    protected VersionedEditModel(TKey id, Guid version) : base(id)
    {
        Version = version;
    }
}

// todo interface?
public abstract class ModelDetails;

public class CreationAuditedModelDetails : ModelDetails
{
    public required Guid CreatorId { get; init; }

    public required string Creator { get; init; }

    public required DateTimeOffset CreationTime { get; init; }
}

public class AuditedModelDetails : CreationAuditedModelDetails
{
    public Guid? LastModifierId { get; init; }

    public string? LastModifier { get; init; }

    public DateTimeOffset? LastModificationTime { get; init; }
}
