namespace DotNetElements.Web.MudBlazor;

public class CrudOptions<TModel>
{
    public string BaseEndpointUri { get; private init; }

    private string getAllEndpoint = null!;
    public string GetAllEndpoint
    {
        get => getAllEndpoint;
        init
        {
            getAllEndpoint = $"{BaseEndpointUri}";

            if (!string.IsNullOrEmpty(value))
                getAllEndpoint += $"/{value.TrimStart('/')}";
        }
    }

    private string getAllWithDetailsEndpoint = null!;
    public string GetAllWithDetailsEndpoint
    {
        get => getAllWithDetailsEndpoint;
        init
        {
            getAllWithDetailsEndpoint = $"{BaseEndpointUri}";

            if (!string.IsNullOrEmpty(value))
                getAllWithDetailsEndpoint += $"/{value.TrimStart('/')}";
        }
    }

    public string GetDetailsEndpoint<TKey>(TKey id) => $"{BaseEndpointUri}/{id}/details";
    public string GetByIdEndpoint<TKey>(TKey id) => $"{BaseEndpointUri}/{id}";

    public CrudOptions(string baseEndpointUri)
    {
        BaseEndpointUri = baseEndpointUri.TrimEnd('/');
        GetAllEndpoint = "";
        GetAllWithDetailsEndpoint = "";
    }
}
