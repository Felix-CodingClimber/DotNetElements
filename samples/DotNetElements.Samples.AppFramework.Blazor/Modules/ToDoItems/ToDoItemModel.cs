using DotNetElements.AppFramework.Abstractions.Model;

namespace DotNetElements.Samples.AppFramework.Blazor.Modules.ToDoItems;

public sealed class ToDoItemModel : Model<Guid>
{
    public required string Title { get; init; }
    public required string? Description { get; init; }
    public required Guid CategoryId { get; init; }
    public required string CategoryName { get; init; }
    public required bool IsCompleted { get; init; }
}

public sealed class CreateToDoItemModel : CreateModel<ToDoItemModel, Guid>
{
    [Required]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [Required]
    public Guid CategoryId { get; set; }
}

public sealed class EditToDoItemModel : EditModel<ToDoItemModel, Guid>, IMapFromModel<EditToDoItemModel, ToDoItemModel>
{
    [Required]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [Required]
    public Guid CategoryId { get; set; }

    public static EditToDoItemModel MapFromModel(ToDoItemModel model)
    {
        return new EditToDoItemModel
        {
            Id = model.Id,
            Title = model.Title,
            Description = model.Description,
            CategoryId = model.CategoryId,
        };
    }
}
