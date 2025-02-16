namespace DotNetElements.Web.Blazor;

public partial class DeleteDialog : ComponentBase
{
    [CascadingParameter]
    private IMudDialogInstance DialogInstance { get; set; } = default!;

    [Parameter, EditorRequired]
    public string ItemValue { get; set; } = default!;

    [Parameter, EditorRequired]
    public string ItemLabel { get; set; } = default!;

    [Parameter]
    public bool IsHardDelete { get; set; }

    [Parameter]
    public string? AdditionalMessage { get; set; }

    private void OnConfirm()
    {
        DialogInstance.Close(DialogResult.Ok(true));
    }

    private void OnCancel()
    {
        DialogInstance.Cancel();
    }
}
