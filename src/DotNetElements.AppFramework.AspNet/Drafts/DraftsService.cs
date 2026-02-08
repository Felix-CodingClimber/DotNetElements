using DotNetElements.AppFramework.Abstractions.Auth;
using DotNetElements.AppFramework.Abstractions.Drafts;
using DotNetElements.AppFramework.Abstractions.Model;

namespace DotNetElements.AppFramework.AspNet.Drafts;

internal sealed class DraftsService<TContent, TDbContext> : ModuleService<TDbContext>
    where TContent : class
    where TDbContext : DbContext, IDbSetDraft<TContent>
{
    public DraftsService(TDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider)
        : base(dbContext, currentUserProvider, timeProvider)
    {
    }

    public async Task<CrudResult<DraftModel<TContent>>> CreateOrUpdateDraftAsync(DraftModel<TContent> model)
    {
        Draft<TContent>? existingEntity = await DbContext.Drafts
            .FindAsync(model.Id);

        if (existingEntity is null)
            return await CreateDraftAsync(model);
        else
            return await UpdateDraftAsync(existingEntity, model);
    }

    public async Task<CrudResult> DeleteDraftByIdAsync(Guid id)
    {
        Draft<TContent>? existingEntity = await DbContext.Drafts
            .FindAsync(id);

        if (existingEntity is null)
            return Fail(CrudError.NotFound);

        DbContext.Drafts.Remove(existingEntity);

        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public async Task<CrudResult<DraftModel<TContent>>> GetDraftById(Guid id)
    {
        Draft<TContent>? existingEntity = await DbContext.Drafts
            .FindAsync(id);

        if (existingEntity is null)
            return Fail(CrudError.NotFound);

        return existingEntity.MapToModel();
    }

    public Task<CrudResult<AuditedModelDetails>> GetDraftAuditDetailsById(Guid id)
    {
        return GetAuditedDetailsByEntityId<Draft<TContent>, Guid>(id);
    }

    private async Task<CrudResult<DraftModel<TContent>>> CreateDraftAsync(DraftModel<TContent> model)
    {
        Draft<TContent> newDraft = model.MapToEntity();

        await AttachAndSaveChangesAsync(newDraft);

        return newDraft.MapToModel();
    }

    private async Task<CrudResult<DraftModel<TContent>>> UpdateDraftAsync(Draft<TContent> existingEntity, DraftModel<TContent> model)
    {
        existingEntity.Update(model);

        await DbContext.SaveChangesAsync();

        return existingEntity.MapToModel();
    }
}