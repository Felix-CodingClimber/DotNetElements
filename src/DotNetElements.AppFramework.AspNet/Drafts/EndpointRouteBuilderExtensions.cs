using DotNetElements.AppFramework.Abstractions.Drafts;
using DotNetElements.AppFramework.Abstractions.Model;
using DotNetElements.AppFramework.AspNet.ResultExtensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace DotNetElements.AppFramework.AspNet.Drafts;

// todo move to ApiResult
public static class EndpointRouteBuilderExtensions
{
    public static IEndpointRouteBuilder MapDrafts<TContent, TDbContext>(this IEndpointRouteBuilder endpoints, string draftsEndpoint)
        where TContent : class
        where TDbContext : DbContext, IDbSetDraft<TContent>
    {
        // Create or update
        endpoints.MapPut(DraftsRoutes.CreateOrUpdate(draftsEndpoint), async (DraftModel<TContent> model, DraftsService<TContent, TDbContext> draftsService) =>
        {
            CrudResult<DraftModel<TContent>> updateResult = await draftsService.CreateOrUpdateDraftAsync(model);

            return updateResult.MapToHttpResult();
        });

        // Delete
        endpoints.MapDelete(DraftsRoutes.Delete(draftsEndpoint), async (Guid id, DraftsService<TContent, TDbContext> draftsService) =>
        {
            CrudResult deleteResult = await draftsService.DeleteDraftByIdAsync(id);

            return deleteResult.MapToHttpResult();
        });

        // Get by ID
        endpoints.MapGet(DraftsRoutes.GetById(draftsEndpoint), async (Guid id, DraftsService<TContent, TDbContext> draftsService) =>
        {
            CrudResult<DraftModel<TContent>> result = await draftsService.GetDraftById(id);

            return result.MapToHttpResult();
        });

        // Get Audit Details
        endpoints.MapGet(DraftsRoutes.GetDetails(draftsEndpoint), async (Guid id, DraftsService<TContent, TDbContext> draftsService) =>
        {
            CrudResult<AuditedModelDetails> auditResult = await draftsService.GetDraftAuditDetailsById(id);

            return auditResult.MapToHttpResult();
        });

        return endpoints;
    }
}
