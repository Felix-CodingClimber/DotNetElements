namespace DotNetElements.Core;

public interface IModel<TKey> : IHasKey<TKey>
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

public abstract class EditModel<TKey> : Model<TKey>
	where TKey : notnull, IEquatable<TKey>
{
	protected EditModel() : base(default!) { }

	protected EditModel(TKey id) : base(id) { }
}

public abstract class VersionedEditModel<TKey> : VersionedModel<TKey>
	where TKey : notnull, IEquatable<TKey>
{
	protected VersionedEditModel(Guid version) : base(default!, version) { }

	protected VersionedEditModel(TKey id, Guid version) : base(id, version) { }
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
