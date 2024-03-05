using Microsoft.Extensions.DependencyInjection;

namespace DotNetElements.Web.Blazor.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddCrudService<TKey, TModel, TDetails, TEditModel>(this IServiceCollection services, CrudOptions<TModel> options)
        where TKey : notnull, IEquatable<TKey>
        where TModel : IModel<TKey>
        where TDetails : ModelDetails
        where TEditModel : IMapFromModel<TEditModel, TModel>, ICreateNew<TEditModel>
    {
        // todo consider using the options pattern
        // Action<CrudOptions<TModel>> configureOptions as parameter
        // Call services.Configure(configureOptions);
        // In CrudService inject a IOptions<CrudOptions<TModel>>

        services.AddScoped<ICrudService<TKey, TModel, TDetails, TEditModel>>(provider => new CrudService<TKey, TModel, TDetails, TEditModel>(
            provider.GetRequiredService<ISnackbar>(),
            provider.GetRequiredService<HttpClient>(),
            options));

        return services;
    }
}
