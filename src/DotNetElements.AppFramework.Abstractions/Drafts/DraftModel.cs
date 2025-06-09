using DotNetElements.AppFramework.Abstractions.Model;

namespace DotNetElements.AppFramework.Abstractions.Drafts;

public sealed class DraftModel<T> : Model<Guid>
{
    public required Guid OwnerId { get; init; }
    public required int Version { get; init; }
    public required T Content { get; init; }
    public string? Name { get; init; }
}
