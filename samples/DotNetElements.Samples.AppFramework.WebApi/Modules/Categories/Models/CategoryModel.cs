using DotNetElements.AppFramework.Abstractions.Model;

namespace DotNetElements.Samples.AppFramework.WebApi.Modules.Categories;

internal sealed class CategoryModel : Model<Guid>
{
    public required string Name { get; init; }
}

internal sealed class CreateCategoryModel : CreateModel<CategoryModel, Guid>
{
    [Required]
    public string? Name { get; set; }
}

internal sealed class EditCategoryModel : EditModel<CategoryModel, Guid>
{
    [Required]
    public string? Name { get; set; }
}
