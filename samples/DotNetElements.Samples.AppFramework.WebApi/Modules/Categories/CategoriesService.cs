using DotNetElements.AppFramework.Abstractions.Auth;
using DotNetElements.AppFramework.Abstractions.Model;
using DotNetElements.AppFramework.Abstractions.ResultObject;
using DotNetElements.Samples.AppFramework.WebApi.Modules.ToDoItems;
using Microsoft.VisualBasic;

namespace DotNetElements.Samples.AppFramework.WebApi.Modules.Categories;

internal sealed class CategoriesService : ModuleService<AppDbContext>
{
    public CategoriesService(AppDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider, ILogger<CategoriesService> logger)
        : base(dbContext, currentUserProvider, timeProvider, logger)
    {
    }

    public async Task<ApiResult<CategoryModel>> CreateCategoryAsync(CreateCategoryModel model)
    {
        ArgumentNullException.ThrowIfNull(model.Name);

        Category newEntity = new(model.Name);

        bool isDuplicate = await EnsureNoDuplicateAsync<Category>(entity => entity.Name == model.Name);

        if (isDuplicate)
            return Fail(DuplicateNameError);

        await AttachAndSaveChangesAsync(newEntity);

        return newEntity.MapToModel();
    }

    public async Task<ApiResult<CategoryModel>> UpdateCategoryAsync(EditCategoryModel model)
    {
        Category? existingEntity = await DbContext.Categories
            .FindIdAsync(model.Id);

        ApiResult<Category> updateResult = await UpdateAndSaveChangesAsync(existingEntity, model, MapCrudError);

        // todo check if we can simplify this return
        if (updateResult.TryGetValue(out Category? updatedEntity, out ErrorDetails? error))
            return updatedEntity.MapToModel();
        else
            return Fail(error.Value);
    }

    public Task<ApiResult> DeleteCategoryByIdAsync(Guid Id)
    {
        return RemoveByIdAndSaveChangesAsync<Category, Guid>(Id, MapCrudError);
    }

    public async Task<ApiResult<CategoryModel>> GetCategoryByIdAsync(Guid id)
    {
        CategoryModel? model = await DbContext.Categories
            .MapToModel()
            .FindIdAsync(id);

        return OkIfNotNull(model, NotFoundError);
    }

    public async Task<IReadOnlyList<CategoryModel>> GetAllCategoriesAsync()
    {
        return await DbContext.Categories
            .MapToModel()
            .ToListAsync();
    }

    public Task<ApiResult<AuditedModelDetails>> GetCategoryAuditDetailsById(Guid id)
    {
        return GetAuditedDetailsByEntityId<Category, Guid>(id, MapCrudError);
    }

    // todo check if we can simplify this method
    public async Task<ApiResult<IReadOnlyList<ToDoItemModel>>> GetToDoItemsByCategoryIdAsync(Guid id)
    {
        Category? category = await DbContext.Categories
            .Include(entity => entity.ToDoItems)
            .FindIdAsync(id);

        // todo check if we can simplify this return
        if (category is null)
            return Fail(NotFoundError);

        // todo check if we can simplify the mapping (in best case do it direct in the query)
        return category.ToDoItems.Select(entity => entity.MapToModel()).ToList();
    }

    private static readonly ErrorDetails ConcurrencyConflictError = new("Categories.ConcurrencyConflict", "Concurrency conflict occurred");
    private static readonly ErrorDetails NotFoundError = new("Categories.NotFound", "Item not found");
    private static readonly ErrorDetails EntryDeletedError = new("Categories.EntryDeleted", "Entry has been deleted");
    private static readonly ErrorDetails UnknownError = new("Categories.UnknownError", "An unknown error occurred");

    private static readonly ErrorDetails DuplicateNameError = new("Categories.DuplicateName", "A category with the same name already exists");

    private static ErrorDetails MapCrudError(CrudError error) => error switch
    {
        CrudError.NotFound => NotFoundError,
        CrudError.ConcurrencyConflict => ConcurrencyConflictError,
        CrudError.EntryDeleted => EntryDeletedError,
        _ => UnknownError
    };
}
