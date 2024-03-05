namespace DotNetElements.Web.Blazor;

public partial class DeleteDialog : ComponentBase
{
    [CascadingParameter]
    private MudDialogInstance DialogInstance { get; set; } = default!;

    [Parameter, EditorRequired]
    public string ItemValue { get; set; } = default!;

    [Parameter, EditorRequired]
    public string ItemLabel { get; set; } = default!;

    private void OnConfirm()
    {
        DialogInstance.Close(DialogResult.Ok(true));
    }

    private void OnCancel()
    {
        DialogInstance.Cancel();
    }
}
