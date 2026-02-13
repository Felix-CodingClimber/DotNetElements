using DotNetElements.AppFramework.Abstractions.Auth;
using DotNetElements.AppFramework.Abstractions.Drafts;
using DotNetElements.AppFramework.Abstractions.Model;
using Microsoft.Extensions.Logging;

namespace DotNetElements.AppFramework.AspNet.Drafts;

// todo add logging
internal sealed class DraftsService<TContent, TDbContext> : ModuleService<TDbContext>
    where TContent : class
    where TDbContext : DbContext, IDbSetDraft<TContent>
{
    public DraftsService(TDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider, ILogger<DraftsService<TContent, TDbContext>> logger)
        : base(dbContext, currentUserProvider, timeProvider, logger)
    {
    }

    public async Task<ApiResult<DraftModel<TContent>>> CreateOrUpdateDraftAsync(DraftModel<TContent> model)
    {
        Draft<TContent>? existingEntity = await DbContext.Drafts
            .FindAsync(model.Id);

        if (existingEntity is null)
            return await CreateDraftAsync(model);
        else
            return await UpdateDraftAsync(existingEntity, model);
    }

    public async Task<ApiResult> DeleteDraftByIdAsync(Guid id)
    {
        Draft<TContent>? existingEntity = await DbContext.Drafts
            .FindAsync(id);

        if (existingEntity is null)
            return Fail(NotFound);

        DbContext.Drafts.Remove(existingEntity);

        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public async Task<ApiResult<DraftModel<TContent>>> GetDraftById(Guid id)
    {
        Draft<TContent>? existingEntity = await DbContext.Drafts
            .FindAsync(id);

        if (existingEntity is null)
            return Fail(NotFound);

        return existingEntity.MapToModel();
    }

    public Task<ApiResult<AuditedModelDetails>> GetDraftAuditDetailsById(Guid id)
    {
        return GetAuditedDetailsByEntityId<Draft<TContent>, Guid>(id, MapCrudError);
    }

    private async Task<ApiResult<DraftModel<TContent>>> CreateDraftAsync(DraftModel<TContent> model)
    {
        Draft<TContent> newDraft = model.MapToEntity();

        await AttachAndSaveChangesAsync(newDraft);

        return newDraft.MapToModel();
    }

    private async Task<ApiResult<DraftModel<TContent>>> UpdateDraftAsync(Draft<TContent> existingEntity, DraftModel<TContent> model)
    {
        existingEntity.Update(model);

        await DbContext.SaveChangesAsync();

        return existingEntity.MapToModel();
    }

    // todo the error details should be settable from outside
    private const string Prefix = "Drafts";
    public static readonly ErrorDetails UnknownError = new($"{Prefix}.UnknownError", "An unknown error occurred while processing the passkey");
    public static readonly ErrorDetails NotFound = new($"{Prefix}.NotFound", "The passkey was not found");
    public static readonly ErrorDetails EntryDeleted = new($"{Prefix}.EntryDeleted", "The passkey is deleted");
    public static readonly ErrorDetails ConcurrencyConflict = new($"{Prefix}.ConcurrencyConflict", "The passkey was modified by someone else");

    private static ErrorDetails MapCrudError(CrudError error) => error switch
    {
        CrudError.NotFound => NotFound,
        CrudError.ConcurrencyConflict => ConcurrencyConflict,
        CrudError.EntryDeleted => EntryDeleted,
        _ => UnknownError
    };
}