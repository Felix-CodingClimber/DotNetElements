using Microsoft.AspNetCore.Builder;

namespace DotNetElements.AppFramework.AspNet.Drafts;

public static class WebApplicationBuilderExtensions
{
    public static WebApplicationBuilder AddDrafts<TContent, TDbContext>(this WebApplicationBuilder builder)
        where TContent : class
        where TDbContext : DbContext, IDbSetDraft<TContent>
    {
        builder.Services.AddModuleService<DraftsService<TContent, TDbContext>, TDbContext>();

        return builder;
    }
}
