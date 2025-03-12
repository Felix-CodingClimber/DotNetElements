using DotNetElements.AppFramework.Abstractions.Auth;
using DotNetElements.AppFramework.Abstractions.Model;
using DotNetElements.Samples.AppFramework.WebApi.Modules.ToDoItems;

namespace DotNetElements.Samples.AppFramework.WebApi.Modules.Categories;

internal sealed class CategoriesService : ModuleService<AppDbContext>
{
    public CategoriesService(AppDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider)
        : base(dbContext, currentUserProvider, timeProvider)
    {
    }

    public async Task<CrudResult<CategoryModel>> CreateCategoryAsync(CreateCategoryModel model)
    {
        ArgumentNullException.ThrowIfNull(model.Name);

        Category newEntity = new(model.Name);

        CrudResult result = await AttachAndSaveChangesAsync(newEntity, entity => entity.Name == model.Name);

        // todo check if we can simplify this return
        if (result.IsFail)
            return result;

        return newEntity.MapToModel();
    }

    public async Task<CrudResult<CategoryModel>> UpdateCategoryAsync(EditCategoryModel model)
    {
        Category? existingEntity = await DbContext.Categories
            .FindAsync(model.Id);

        CrudResult<Category> updateResult = await UpdateAndSaveChangesAsync(existingEntity, model);

        // todo check if we can simplify this return
        if (updateResult.TryGetValue(out Category? updatedEntity, out CrudError? error))
            return updatedEntity.MapToModel();
        else
            return Fail(error.Value);
    }

    public Task<CrudResult> DeleteCategoryByIdAsync(Guid Id)
    {
        return RemoveByIdAndSaveChangesAsync<Category, Guid>(Id);
    }

    public async Task<CrudResult<CategoryModel>> GetCategoryByIdAsync(Guid id)
    {
        CategoryModel? model = await DbContext.Categories
            .MapToModel()
            .FindAsync(id);

        return OkIfNotNull(model, CrudError.NotFound);
    }

    public async Task<IReadOnlyList<CategoryModel>> GetAllCategoriesAsync()
    {
        return await DbContext.Categories
            .MapToModel()
            .ToListAsync();
    }

    public Task<CrudResult<AuditedModelDetails>> GetCategoryAuditDetailsById(Guid id)
    {
        return GetAuditedDetailsByEntityId<Category, Guid>(id);
    }

    // todo check if we can simplify this method
    public async Task<CrudResult<IReadOnlyList<ToDoItemModel>>> GetToDoItemsByCategoryIdAsync(Guid id)
    {
        Category? category = await DbContext.Categories
            .Include(entity => entity.ToDoItems)
            .FindAsync(id);

        // todo check if we can simplify this return
        if (category is null)
            return Fail(CrudError.NotFound);

        // todo check if we can simplify the mapping (in best case do it direct in the query)
        return category.ToDoItems.Select(entity => entity.MapToModel()).ToList();
    }
}
