namespace DotNetElements.AppFramework.Abstractions.Model;

public interface IModel<TKey> : IHasKey<TKey>
    where TKey : notnull, IEquatable<TKey>;

public interface ICreateModel<TModel, TKey>
    where TModel : Model<TKey>
    where TKey : notnull, IEquatable<TKey>;

public interface IEditModel<TModel, TKey> : IHasKey<TKey>
    where TModel : Model<TKey>
    where TKey : notnull, IEquatable<TKey>;

public abstract class Model<TKey> : IModel<TKey>
    where TKey : notnull, IEquatable<TKey>
{
    public required TKey Id { get; init; }
}

public abstract class VersionedModel<TKey> : Model<TKey>, IHasVersion
    where TKey : notnull, IEquatable<TKey>
{
    public required Guid Version { get; init; }
}

public abstract class CreateModel<TModel, TKey> : ICreateModel<TModel, TKey>
    where TModel : Model<TKey>
    where TKey : notnull, IEquatable<TKey>;

public abstract class EditModel<TModel, TKey> : IEditModel<TModel, TKey>
    where TModel : Model<TKey>
    where TKey : notnull, IEquatable<TKey>
{
    public required TKey Id { get; init; }
}

public abstract class VersionedEditModel<TModel, TKey> : EditModel<TModel, TKey>, IHasVersion
    where TModel : VersionedModel<TKey>
    where TKey : notnull, IEquatable<TKey>
{
    public required Guid Version { get; init; }
}

// todo interface?
public abstract class ModelDetails;

public class CreationAuditedModelDetails : ModelDetails
{
    public required Guid CreatorId { get; init; }

    public required string CreatorDisplayName { get; init; }

    public required DateTimeOffset CreationTime { get; init; }
}

public class AuditedModelDetails : CreationAuditedModelDetails
{
    public required Guid? LastModifierId { get; init; }

    public required string? LastModifierDisplayName { get; init; }

    public required DateTimeOffset? LastModificationTime { get; init; }
}

public class DeletionAuditedModelDetails : AuditedModelDetails
{
    public required bool IsDeleted { get; init; }

    public required Guid? DeleterId { get; init; }

    public required string? DeleterDisplayName { get; init; }

    public required DateTimeOffset? DeletionTime { get; init; }
}
