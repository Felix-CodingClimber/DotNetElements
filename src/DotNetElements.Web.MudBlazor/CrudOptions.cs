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
            getAllEndpoint = $"{BaseEndpointUri.TrimEnd('/')}";

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
            getAllWithDetailsEndpoint = $"{BaseEndpointUri.TrimEnd('/')}";

            if (!string.IsNullOrEmpty(value))
                getAllWithDetailsEndpoint += $"/{value.TrimStart('/')}";
        }
    }

    public string GetDetailsEndpoint(string id) => $"{BaseEndpointUri.TrimEnd('/')}/{id}/details";

    public CrudOptions(string baseEndpointUri)
    {
        BaseEndpointUri = baseEndpointUri;
        GetAllEndpoint = "";
        GetAllWithDetailsEndpoint = "";
    }
}
