namespace DotNetElements.Web.MudBlazor;

public class CrudTableOptions<TModel>
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

    public required string DeleteEntryLabel { get; set; }
    public required Func<TModel, string> DeleteEntryValue { get; set; }

    public string GetDetailsEndpoint(string id) => $"{BaseEndpointUri.TrimEnd('/')}/{id}/details";

    public DialogOptions EditDialogOptions { get; init; }

    public CrudTableOptions(string baseEndpointUri)
    {
        BaseEndpointUri = baseEndpointUri;
        GetAllEndpoint = "";
        EditDialogOptions = CrudTable.DefaultEditDialogOptions;
    }

    public CrudTableOptions(string baseEndpointUri, MaxWidth editDialogMaxWidth) : this(baseEndpointUri)
    {
        EditDialogOptions.MaxWidth = editDialogMaxWidth;
    }
}
