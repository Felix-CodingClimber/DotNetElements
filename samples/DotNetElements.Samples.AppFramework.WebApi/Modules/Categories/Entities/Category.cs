using DotNetElements.AppFramework.Abstractions.Entity;
using DotNetElements.Samples.AppFramework.WebApi.Modules.ToDoItems;

namespace DotNetElements.Samples.AppFramework.WebApi.Modules.Categories;

internal sealed class Category : AuditedEntity<Guid>, IUpdateFromEx<EditCategoryModel>
{
    public string Name { get; private set; }

    private readonly List<ToDoItem> toDoItems = [];

    [BackingField(nameof(toDoItems))]
    public IReadOnlyList<ToDoItem> ToDoItems => toDoItems;

    public Category(string title)
    {
        Name = title;
    }

#nullable disable
    private Category() { }
#nullable enable

    public void Update(EditCategoryModel from, IEntityUpdateHelper entityUpdateHelper)
    {
        ArgumentNullException.ThrowIfNull(from.Name);

        Name = from.Name;
    }
}
