using System.Text.Json;
using DotNetElements.AppFramework.Abstractions.Entity;

namespace DotNetElements.AppFramework.Abstractions.Drafts;

public sealed class Draft<T> : AuditedEntity<Guid>, IUpdateFrom<DraftModel<T>>
{
    public Guid OwnerId { get; private init; }
    public int Version { get; private set; }
    public string Content { get; private set; }
    public string? CommitMessage { get; private init; }

    public Draft(Guid ownerId, int version, T content, string? commitMessage)
    {
        OwnerId = ownerId;
        Version = version;
        CommitMessage = commitMessage;

        Content = JsonSerializer.Serialize(content);
    }

#nullable disable
    private Draft() { } // EF Core constructor
#nullable enable

    public void Update(DraftModel<T> from)
    {
        string updatedContent = JsonSerializer.Serialize(from.Content);

        if (Content == updatedContent)
            return;

        Content = updatedContent;
        Version = from.Version;
    }

    public T GetTypedContent()
    {
        return JsonSerializer.Deserialize<T>(Content)!;
    }
}

public static class DraftMapper
{
    public static Draft<T> MapToEntity<T>(this DraftModel<T> model)
    {
        return new Draft<T>(model.OwnerId, model.Version, model.Content, model.CommitMessage);
    }

    public static DraftModel<T> MapToModel<T>(this Draft<T> entity)
    {
        return new DraftModel<T>
        {
            Id = entity.Id,
            OwnerId = entity.OwnerId,
            Version = entity.Version,
            Content = JsonSerializer.Deserialize<T>(entity.Content)!,
            CommitMessage = entity.CommitMessage
        };
    }
}
