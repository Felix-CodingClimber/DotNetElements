namespace DotNetElements.Samples.AppFramework.WebApi.Modules.ToDoItems;

internal static class MapperExtensions
{
    public static ToDoItemModel MapToModel(this ToDoItem entity)
    {
        ArgumentNullException.ThrowIfNull(entity.Category);

        return new ToDoItemModel
        {
            Id = entity.Id,
            Title = entity.Title,
            Description = entity.Description,
            IsCompleted = entity.IsCompleted,
            CategoryId = entity.CategoryId,
            CategoryName = entity.Category.Name,
        };
    }

    public static IQueryable<ToDoItemModel> MapToModel(this IQueryable<ToDoItem> query)
    {
        return Queryable.Select(query, entity => new ToDoItemModel()
        {
            Id = entity.Id,
            Title = entity.Title,
            Description = entity.Description,
            IsCompleted = entity.IsCompleted,
            CategoryId = entity.CategoryId,
            CategoryName = entity.Category.Name,
        });
    }
}
