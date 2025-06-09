using DotNetElements.AppFramework.Abstractions.Drafts;
using DotNetElements.AppFramework.Abstractions.Model;
using DotNetElements.AppFramework.AspNet.ResultExtensions;
using Microsoft.AspNetCore.Builder;

namespace DotNetElements.AppFramework.AspNet.Drafts;

public static class WebApplicationExtensions
{
    public static WebApplication UseDrafts<TContent, TDbContext>(WebApplication app, string draftsEndpoint)
        where TContent : class
        where TDbContext : DbContext, IDbSetDraft<TContent>
    {
        // Create or update
        app.MapPut(DraftsRoutes.CreateOrUpdate(draftsEndpoint), async (DraftModel<TContent> model, DraftsService<TContent, TDbContext> draftsService) =>
        {
            CrudResult<DraftModel<TContent>> updateResult = await draftsService.CreateOrUpdateDraftAsync(model);

            return updateResult.MapToHttpResult();
        });

        // Delete
        app.MapDelete(DraftsRoutes.Delete(draftsEndpoint), async (Guid id, DraftsService<TContent, TDbContext> draftsService) =>
        {
            CrudResult deleteResult = await draftsService.DeleteDraftByIdAsync(id);

            return deleteResult.MapToHttpResult();
        });

        // Get by ID
        app.MapGet(DraftsRoutes.GetById(draftsEndpoint), async (Guid id, DraftsService<TContent, TDbContext> draftsService) =>
        {
            CrudResult<DraftModel<TContent>> result = await draftsService.GetDraftById(id);

            return result.MapToHttpResult();
        });

        // Get Audit Details
        app.MapGet(DraftsRoutes.GetDetails(draftsEndpoint), async (Guid id, DraftsService<TContent, TDbContext> draftsService) =>
        {
            CrudResult<AuditedModelDetails> auditResult = await draftsService.GetDraftAuditDetailsById(id);

            return auditResult.MapToHttpResult();
        });

        return app;
    }
}
