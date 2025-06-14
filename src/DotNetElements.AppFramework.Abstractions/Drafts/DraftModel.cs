using DotNetElements.AppFramework.Abstractions.Model;

namespace DotNetElements.AppFramework.Abstractions.Drafts;

public sealed class DraftModel<T> : Model<Guid>
{
    [Required]
    public required Guid OwnerId { get; init; }

    [Required]
    public required int Version { get; init; }

    [Required]
    public required T Content { get; init; }

    [MaxLength(255)]
    public string? CommitMessage { get; init; }

    public static DraftModel<T> CreateNew(Guid ownerId, T content, string? commitMessage)
    {
        return new DraftModel<T>
        {
            Id = Guid.NewGuid(),
            OwnerId = ownerId,
            Version = 1,
            Content = content,
            CommitMessage = commitMessage
        };
    }
}
