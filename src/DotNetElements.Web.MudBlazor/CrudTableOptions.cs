namespace DotNetElements.Web.MudBlazor;

public class CrudTableOptions<TModel> : CrudOptions<TModel>
{
    public required string DeleteEntryLabel { get; set; }
    public required Func<TModel, string> DeleteEntryValue { get; set; }

    public DialogOptions EditDialogOptions { get; init; }

    public CrudTableOptions(string baseEndpointUri) : base(baseEndpointUri)
    {
        EditDialogOptions = CrudTable.DefaultEditDialogOptions;
    }

    public CrudTableOptions(string baseEndpointUri, MaxWidth editDialogMaxWidth) : this(baseEndpointUri)
    {
        EditDialogOptions.MaxWidth = editDialogMaxWidth;
    }
}
