using DotNetElements.AppFramework.Abstractions.Entity;
using DotNetElements.Samples.AppFramework.WebApi.Modules.Categories;

namespace DotNetElements.Samples.AppFramework.WebApi.Modules.ToDoItems;

internal sealed class ToDoItem : AuditedEntity<Guid>, IUpdateFromEx<EditToDoItemModel>
{
    public string Title { get; private set; }
    public string? Description { get; private set; }
    public bool IsCompleted { get; private set; }
    public Guid CategoryId { get; private set; }

    [BackingField(nameof(CategoryId))]
    public Category Category { get; private set; } = null!;

    public ToDoItem(string title, string? description, Guid categoryId)
    {
        Title = title;
        Description = description;
        CategoryId = categoryId;
    }

#nullable disable
    private ToDoItem() { }
#nullable enable

    public void Update(EditToDoItemModel from, IEntityUpdateHelper entityUpdateHelper)
    {
        ArgumentNullException.ThrowIfNull(from.Title);

        Title = from.Title;
        Description = from.Description;
        CategoryId = from.CategoryId;
    }

    public void SetIsCompleted(bool isCompleted)
    {
        IsCompleted = isCompleted;
    }
}
