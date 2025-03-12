using DotNetElements.Samples.AppFramework.Blazor.Components.Components;
using MudBlazor;

namespace DotNetElements.Samples.AppFramework.Blazor.Components.Utils;

public static class DialogServiceExtensions
{
    public static async Task<bool> ShowDeleteDialog(this IDialogService dialogService, string title, string itemValue, string itemLabel)
    {
        var dialogParameters = new DialogParameters<DeleteDialog>
        {
            { x => x.ItemValue, itemValue },
            { x => x.ItemLabel, itemLabel }
        };

        IDialogReference dialog = await dialogService.ShowAsync<DeleteDialog>(title, dialogParameters);
        DialogResult? result = await dialog.Result;

        return result?.Canceled ?? false;
    }
}
