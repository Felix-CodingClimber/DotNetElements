namespace DotNetElements.Samples.AppFramework.WebApi.Modules.Categories;

internal static class MapperExtensions
{
    public static CategoryModel MapToModel(this Category entity)
    {
        return new CategoryModel
        {
            Id = entity.Id,
            Name = entity.Name,
        };
    }

    public static IQueryable<CategoryModel> MapToModel(this IQueryable<Category> query)
    {
        return Queryable.Select(query, entity => new CategoryModel()
        {
            Id = entity.Id,
            Name = entity.Name,
        });
    }
}
