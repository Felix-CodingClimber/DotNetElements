using DotNetElements.AppFramework.Abstractions.Auth;
using DotNetElements.AppFramework.Abstractions.Model;

namespace DotNetElements.Samples.AppFramework.WebApi.Modules.ToDoItems;

internal sealed class ToDoItemsService : ModuleService<AppDbContext>
{
    public ToDoItemsService(AppDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider)
        : base(dbContext, currentUserProvider, timeProvider)
    {
    }

    public async Task<CrudResult<ToDoItemModel>> CreateToDoItemAsync(CreateToDoItemModel model)
    {
        ArgumentNullException.ThrowIfNull(model.Title);

        ToDoItem newEntity = new(model.Title, model.Description, model.CategoryId);

        await AttachAndSaveChangesAsync(newEntity);

        // todo check if we can reduce the number of queries
        return await GetToDoItemByIdAsync(newEntity.Id);
    }

    public async Task<CrudResult<ToDoItemModel>> UpdateToDoItemAsync(EditToDoItemModel model)
    {
        ToDoItem? existingEntity = await DbContext.ToDoItems
            .Include(entity => entity.Category)
            .FindAsync(model.Id);

        CrudResult<ToDoItem> updateResult = await UpdateAndSaveChangesAsync(existingEntity, model);

        if (updateResult.TryGetValue(out ToDoItem? updatedEntity, out CrudError? error))
            // todo check if we can reduce the number of queries
            return await GetToDoItemByIdAsync(updatedEntity.Id);
        else
            return Fail(error.Value);
    }

    public async Task<CrudResult> SetToDoItemCompletedAsync(Guid id, bool isCompleted)
    {
        ToDoItem? existingEntity = await DbContext.ToDoItems
            .FindAsync(id);

        if (existingEntity is null)
            return Fail(CrudError.NotFound);

        existingEntity.SetIsCompleted(isCompleted);

        await DbContext.SaveChangesAsync();

        return CrudResult.Ok(); // todo remove CrudResult. when result package is updated
    }

    public Task<CrudResult> DeleteToDoItemByIdAsync(Guid Id)
    {
        return RemoveByIdAndSaveChangesAsync<ToDoItem, Guid>(Id);
    }

    public async Task<CrudResult<ToDoItemModel>> GetToDoItemByIdAsync(Guid id)
    {
        ToDoItemModel? model = await DbContext.ToDoItems
            .MapToModel()
            .FindAsync(id);

        return OkIfNotNull(model, CrudError.NotFound);
    }

    public async Task<IReadOnlyList<ToDoItemModel>> GetAllToDoItemsAsync()
    {
        return await DbContext.ToDoItems
            .MapToModel()
            .ToListAsync();
    }

    public Task<CrudResult<AuditedModelDetails>> GetToDoItemAuditDetailsById(Guid id)
    {
        return GetAuditedDetailsByEntityId<ToDoItem, Guid>(id);
    }
}
