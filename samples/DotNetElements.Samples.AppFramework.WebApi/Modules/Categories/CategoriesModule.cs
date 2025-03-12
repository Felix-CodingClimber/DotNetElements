using DotNetElements.AppFramework.AspNet;
using DotNetElements.AppFramework.AspNet.ResultExtensions;
using DotNetElements.Samples.AppFramework.WebApi.Modules.ToDoItems;

namespace DotNetElements.Samples.AppFramework.WebApi.Modules.Categories;

internal sealed class CategoriesModule : IModule
{
    public void RegisterModules(WebApplicationBuilder builder)
    {
        builder.Services.AddModuleService<CategoriesService, AppDbContext>();
    }

    public void MapEndpoints(IEndpointRouteBuilder endpoints)
    {
        RouteGroupBuilder groupBuilder = endpoints.MapGroup("/api/categories");

        groupBuilder.MapGet("", async (CategoriesService service) =>
        {
            return await service.GetAllCategoriesAsync();
        });

        groupBuilder.MapGet("{id}", async (CategoriesService service, Guid id) =>
        {
            CrudResult<CategoryModel> result = await service.GetCategoryByIdAsync(id);

            return result.MapToHttpResult();
        });

        groupBuilder.MapPost("", async (CategoriesService service, CreateCategoryModel model) =>
        {
            CrudResult<CategoryModel> result = await service.CreateCategoryAsync(model);

            return result.MapToHttpResult();
        });

        groupBuilder.MapPut("", async (CategoriesService service, EditCategoryModel model) =>
        {
            CrudResult<CategoryModel> result = await service.UpdateCategoryAsync(model);

            return result.MapToHttpResult();
        });

        groupBuilder.MapDelete("{id}", async (CategoriesService service, Guid id) =>
        {
            CrudResult result = await service.DeleteCategoryByIdAsync(id);

            return result.MapToHttpResult();
        });

        groupBuilder.MapGet("{id}/todoItems", async (CategoriesService service, Guid id) =>
        {
            CrudResult<IReadOnlyList<ToDoItemModel>> result = await service.GetToDoItemsByCategoryIdAsync(id);

            return result.MapToHttpResult();
        });
    }
}
