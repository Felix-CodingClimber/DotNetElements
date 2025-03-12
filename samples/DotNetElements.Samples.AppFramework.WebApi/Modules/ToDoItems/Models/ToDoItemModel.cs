using DotNetElements.AppFramework.Abstractions.Model;

namespace DotNetElements.Samples.AppFramework.WebApi.Modules.ToDoItems;

internal sealed class ToDoItemModel : Model<Guid>
{
    public required string Title { get; init; }
    public required string? Description { get; init; }
    public required Guid CategoryId { get; init; }
    public required string CategoryName { get; init; }
    public required bool IsCompleted { get; init; }
}

internal sealed class CreateToDoItemModel : CreateModel<ToDoItemModel, Guid>
{
    [Required]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [Required]
    public Guid CategoryId { get; set; }
}

internal sealed class EditToDoItemModel : EditModel<ToDoItemModel, Guid>
{
    [Required]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [Required]
    public Guid CategoryId { get; set; }
}
