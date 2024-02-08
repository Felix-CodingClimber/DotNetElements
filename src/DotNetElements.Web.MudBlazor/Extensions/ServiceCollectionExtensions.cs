using Microsoft.Extensions.DependencyInjection;

namespace DotNetElements.Web.MudBlazor.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddCrudService<TKey, TModel, TDetails, TEditModel>(this IServiceCollection services, CrudOptions<TModel> options)
        where TKey : notnull, IEquatable<TKey>
        where TModel : IModel<TKey>
        where TDetails : ModelDetails
        where TEditModel : IMapFromModel<TEditModel, TModel>, ICreateNew<TEditModel>
    {
        services.AddScoped<ICrudService<TKey, TModel, TDetails, TEditModel>>(provider => new CrudService<TKey, TModel, TDetails, TEditModel>(
            provider.GetRequiredService<ISnackbar>(),
            provider.GetRequiredService<HttpClient>(),
            options));

        return services;
    }
}
