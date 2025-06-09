using System.Text.Json;
using DotNetElements.AppFramework.Abstractions.Entity;

namespace DotNetElements.AppFramework.Abstractions.Drafts;

public sealed class Draft<T> : AuditedEntity<Guid>, IUpdateFrom<DraftModel<T>>
{
    public Guid OwnerId { get; private init; }
    public int Version { get; private set; }
    public string Content { get; private set; }
    public string? Name { get; private init; }

    public Draft(Guid ownerId, T content, string? name)
    {
        OwnerId = ownerId;
        Name = name;

        Content = JsonSerializer.Serialize(content);
        Version = 1;
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
        Version++;
    }
}

public static class DraftMapper
{
    public static Draft<T> MapToEntity<T>(this DraftModel<T> model)
    {
        return new Draft<T>(model.OwnerId, model.Content, model.Name);
    }

    public static DraftModel<T> MapToModel<T>(this Draft<T> entity)
    {
        return new DraftModel<T>
        {
            Id = entity.Id,
            OwnerId = entity.OwnerId,
            Version = entity.Version,
            Content = JsonSerializer.Deserialize<T>(entity.Content)!,
            Name = entity.Name
        };
    }
}
