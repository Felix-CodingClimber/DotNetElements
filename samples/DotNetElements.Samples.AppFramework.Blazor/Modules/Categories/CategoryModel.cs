using DotNetElements.AppFramework.Abstractions.Model;

namespace DotNetElements.Samples.AppFramework.Blazor.Modules.Categories;

public sealed class CategoryModel : Model<Guid>
{
    public required string Name { get; init; }
}

public sealed class CreateCategoryModel : CreateModel<CategoryModel, Guid>
{
    [Required]
    public string? Name { get; set; }
}

public sealed class EditCategoryModel : EditModel<CategoryModel, Guid>, IMapFromModel<EditCategoryModel, CategoryModel>
{
    [Required]
    public string? Name { get; set; }

    public static EditCategoryModel MapFromModel(CategoryModel model)
    {
        return new EditCategoryModel
        {
            Id = model.Id,
            Name = model.Name,
        };
    }
}
