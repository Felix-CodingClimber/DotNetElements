using Microsoft.Extensions.DependencyInjection;

namespace DotNetElements.AppFramework.AspNet.Drafts;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDraftsService<TContent, TDbContext>(this IServiceCollection services)
        where TContent : class
        where TDbContext : DbContext, IDbSetDraft<TContent>
    {
        services.AddModuleService<DraftsService<TContent, TDbContext>, TDbContext>();

        return services;
    }
}
