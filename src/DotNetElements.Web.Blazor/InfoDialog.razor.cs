namespace DotNetElements.Web.Blazor;

public partial class InfoDialog : ComponentBase
{
    [CascadingParameter]
    private MudDialogInstance DialogInstance { get; set; } = default!;

    [Parameter, EditorRequired]
    public RenderFragment DialogContent { get; set; } = default!;

    private void OnClose()
    {
        DialogInstance.Close();
    }
}
