namespace BlazorCrud.Core;

public interface IModel<TKey>
	where TKey : notnull
{
	TKey Id { get; }
}

public abstract record class Model<TKey>(TKey Id) : IModel<TKey>
	where TKey : notnull;

public abstract class ModelDetails
{
}

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
