using DotNetElements.AppFramework.MudBlazorExtensions.Components;
using Microsoft.AspNetCore.Components;

namespace DotNetElements.AppFramework.MudBlazorExtensions.Extensions;

public static class DialogServiceExtensions
{
    private static readonly DialogOptions deleteDialogOptions = new()
    {
        CloseOnEscapeKey = true,
    };

    public static async Task<Result<TReturnValue>> ShowWithReturnValueAsync<TDialog, TReturnValue>(this IDialogService dialogService, string? title)
        where TDialog : IComponent
    {
        IDialogReference dialogRef = await dialogService.ShowAsync<TDialog>(title);

        DialogResult? dialogResult = await dialogRef.Result;

        if (dialogResult?.Canceled is not false)
            return Fail();

        if (dialogResult.Data is not TReturnValue returnValue)
            throw new InvalidOperationException($"Dialog result data needs to be of type {typeof(TReturnValue)}");

        return returnValue;
    }

    public static async Task<Result<TReturnValue>> ShowWithReturnValueAsync<TDialog, TReturnValue>(this IDialogService dialogService, string? title, DialogParameters parameters)
        where TDialog : IComponent
    {
        IDialogReference dialogRef = await dialogService.ShowAsync<TDialog>(title, parameters);

        DialogResult? dialogResult = await dialogRef.Result;

        if (dialogResult?.Canceled is not false)
            return Fail();

        if (dialogResult.Data is not TReturnValue returnValue)
            throw new InvalidOperationException($"Dialog result data needs to be of type {typeof(TReturnValue)}");

        return returnValue;
    }

    public static async Task<bool> ShowConfirmDeleteDialog(this IDialogService dialogService, string title, string itemLabel, string itemValue)
    {
        DialogParameters<DeleteDialog> dialogParameters = new()
        {
            { x => x.ItemLabel, itemLabel },
            { x => x.ItemValue, itemValue }
        };

        IDialogReference dialog = await dialogService.ShowAsync<DeleteDialog>(title, dialogParameters, deleteDialogOptions);
        DialogResult? result = await dialog.Result;

        return result?.Data is true;
    }

    // todo add overload with list of error messages
    public static Task ShowValidationErrorMessage(this IDialogService dialogService)
    {
        return dialogService.ShowMessageBox("Validation Error", "Please fix all validation errors.");
    }
}
