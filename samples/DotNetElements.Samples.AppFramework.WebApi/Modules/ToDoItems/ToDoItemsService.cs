using DotNetElements.AppFramework.Abstractions.Auth;
using DotNetElements.AppFramework.Abstractions.Model;
using DotNetElements.AppFramework.Abstractions.ResultObject;

namespace DotNetElements.Samples.AppFramework.WebApi.Modules.ToDoItems;

internal sealed class ToDoItemsService : ModuleService<AppDbContext>
{
    public ToDoItemsService(AppDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider, ILogger<ToDoItemsService> logger)
        : base(dbContext, currentUserProvider, timeProvider, logger)
    {
    }

    public async Task<ApiResult<ToDoItemModel>> CreateToDoItemAsync(CreateToDoItemModel model)
    {
        ArgumentNullException.ThrowIfNull(model.Title);

        ToDoItem newEntity = new(model.Title, model.Description, model.CategoryId);

        await AttachAndSaveChangesAsync(newEntity);

        // todo check if we can reduce the number of queries
        return await GetToDoItemByIdAsync(newEntity.Id);
    }

    public async Task<ApiResult<ToDoItemModel>> UpdateToDoItemAsync(EditToDoItemModel model)
    {
        ToDoItem? existingEntity = await DbContext.ToDoItems
            .Include(entity => entity.Category)
            .FindIdAsync(model.Id);

        ApiResult<ToDoItem> updateResult = await UpdateAndSaveChangesAsync(existingEntity, model, MapCrudError);

        if (updateResult.TryGetValue(out ToDoItem? updatedEntity, out ErrorDetails? error))
            // todo check if we can reduce the number of queries
            return await GetToDoItemByIdAsync(updatedEntity.Id);
        else
            return Fail(error.Value);
    }

    public async Task<ApiResult> SetToDoItemCompletedAsync(Guid id, bool isCompleted)
    {
        ToDoItem? existingEntity = await DbContext.ToDoItems
            .FindAsync(id);

        if (existingEntity is null)
            return Fail(NotFoundError);

        existingEntity.SetIsCompleted(isCompleted);

        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public Task<ApiResult> DeleteToDoItemByIdAsync(Guid Id)
    {
        return RemoveByIdAndSaveChangesAsync<ToDoItem, Guid>(Id, MapCrudError);
    }

    public async Task<ApiResult<ToDoItemModel>> GetToDoItemByIdAsync(Guid id)
    {
        ToDoItemModel? model = await DbContext.ToDoItems
            .MapToModel()
            .FindIdAsync(id);

        return OkIfNotNull(model, NotFoundError);
    }

    public async Task<IReadOnlyList<ToDoItemModel>> GetAllToDoItemsAsync()
    {
        return await DbContext.ToDoItems
            .MapToModel()
            .ToListAsync();
    }

    public Task<ApiResult<AuditedModelDetails>> GetToDoItemAuditDetailsById(Guid id)
    {
        return GetAuditedDetailsByEntityId<ToDoItem, Guid>(id, MapCrudError);
    }

    private static readonly ErrorDetails ConcurrencyConflictError = new("ToDoItems.ConcurrencyConflict", "Concurrency conflict occurred");
    private static readonly ErrorDetails NotFoundError = new("ToDoItems.NotFound", "Item not found");
    private static readonly ErrorDetails EntryDeletedError = new("ToDoItems.EntryDeleted", "Entry has been deleted");
    private static readonly ErrorDetails UnknownError = new("ToDoItems.UnknownError", "An unknown error occurred");

    private static ErrorDetails MapCrudError(CrudError error) => error switch
    {
        CrudError.NotFound => NotFoundError,
        CrudError.ConcurrencyConflict => ConcurrencyConflictError,
        CrudError.EntryDeleted => EntryDeletedError,
        _ => UnknownError
    };
}
