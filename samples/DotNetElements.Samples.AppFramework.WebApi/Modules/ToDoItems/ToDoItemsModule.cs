using DotNetElements.AppFramework.Abstractions.ResultObject;
using DotNetElements.AppFramework.AspNet;
using DotNetElements.AppFramework.AspNet.ResultExtensions;

namespace DotNetElements.Samples.AppFramework.WebApi.Modules.ToDoItems;

internal sealed class ToDoItemsModule : IModule
{
    public void RegisterModules(WebApplicationBuilder builder)
    {
        builder.Services.AddModuleService<ToDoItemsService, AppDbContext>();
    }

    public void MapEndpoints(IEndpointRouteBuilder endpoints)
    {
        RouteGroupBuilder groupBuilder = endpoints.MapGroup("/api/todoItems");

        groupBuilder.MapGet("", async (ToDoItemsService service) =>
        {
            return await service.GetAllToDoItemsAsync();
        });

        groupBuilder.MapGet("{id}", async (ToDoItemsService service, Guid id) =>
        {
            ApiResult<ToDoItemModel> result = await service.GetToDoItemByIdAsync(id);

            return result.MapToHttpResult();
        });

        groupBuilder.MapPost("", async (ToDoItemsService service, CreateToDoItemModel model) =>
        {
            ApiResult<ToDoItemModel> result = await service.CreateToDoItemAsync(model);

            return result.MapToHttpResult();
        });

        groupBuilder.MapPut("", async (ToDoItemsService service, EditToDoItemModel model) =>
        {
            ApiResult<ToDoItemModel> result = await service.UpdateToDoItemAsync(model);

            return result.MapToHttpResult();
        });

        groupBuilder.MapPut("{id}/setCompleted", async (ToDoItemsService service, Guid id) =>
        {
            ApiResult result = await service.SetToDoItemCompletedAsync(id, true);

            return result.MapToHttpResult();
        });

        groupBuilder.MapDelete("{id}", async (ToDoItemsService service, Guid id) =>
        {
            ApiResult result = await service.DeleteToDoItemByIdAsync(id);

            return result.MapToHttpResult();
        });
    }
}
