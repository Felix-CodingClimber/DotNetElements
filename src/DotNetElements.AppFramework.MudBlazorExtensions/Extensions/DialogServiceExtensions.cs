using DotNetElements.AppFramework.MudBlazorExtensions.Components;
using Microsoft.AspNetCore.Components;

namespace DotNetElements.AppFramework.MudBlazorExtensions.Extensions;

public static class DialogDefaults
{
    public static readonly DialogOptions Small = new()
    {
        CloseOnEscapeKey = true,
        FullWidth = true,
        MaxWidth = MaxWidth.Small,
    };

    public static readonly DialogOptions Medium = new()
    {
        CloseOnEscapeKey = true,
        FullWidth = true,
        MaxWidth = MaxWidth.Medium,
    };

    public static readonly DialogOptions Large = new()
    {
        CloseOnEscapeKey = true,
        FullWidth = true,
        MaxWidth = MaxWidth.Large,
    };

    public static readonly DialogOptions ExtraLarge = new()
    {
        CloseOnEscapeKey = true,
        FullWidth = true,
        MaxWidth = MaxWidth.ExtraLarge,
    };
}

public static class DialogServiceExtensions
{
    public static async Task<Result<TReturnValue>> ShowWithReturnValueAsync<TDialog, TReturnValue>(this IDialogService dialogService, string? title, DialogOptions? dialogOptions = null)
        where TDialog : IComponent
    {
        IDialogReference dialogRef = await dialogService.ShowAsync<TDialog>(title, dialogOptions ?? DialogDefaults.Small);

        DialogResult? dialogResult = await dialogRef.Result;

        if (dialogResult?.Canceled is not false)
            return Fail();

        if (dialogResult.Data is not TReturnValue returnValue)
            throw new InvalidOperationException($"Dialog result data needs to be of type {typeof(TReturnValue)}");

        return returnValue;
    }

    public static async Task<Result<TReturnValue>> ShowWithReturnValueAsync<TDialog, TReturnValue>(this IDialogService dialogService, string? title, DialogParameters parameters, DialogOptions? dialogOptions = null)
        where TDialog : IComponent
    {
        IDialogReference dialogRef = await dialogService.ShowAsync<TDialog>(title, parameters, dialogOptions ?? DialogDefaults.Small);

        DialogResult? dialogResult = await dialogRef.Result;

        if (dialogResult?.Canceled is not false)
            return Fail();

        if (dialogResult.Data is not TReturnValue returnValue)
            throw new InvalidOperationException($"Dialog result data needs to be of type {typeof(TReturnValue)}");

        return returnValue;
    }

    public static async Task<bool> ShowConfirmDeleteDialogAsync(this IDialogService dialogService, string title, string itemLabel, string itemValue, bool needToConfirmValue = false)
    {
        DialogParameters<DeleteDialog> dialogParameters = new()
        {
            { x => x.ItemLabel, itemLabel },
            { x => x.ItemValue, itemValue },
            { x => x.NeedToConfirmValue, needToConfirmValue }
        };

        IDialogReference dialog = await dialogService.ShowAsync<DeleteDialog>(title, dialogParameters, DialogDefaults.Small);
        DialogResult? result = await dialog.Result;

        return result?.Data is true;
    }

    // todo add overload with list of error messages
    public static Task ShowValidationErrorMessage(this IDialogService dialogService)
    {
        return dialogService.ShowMessageBox("Validation Error", "Please fix all validation errors.");
    }
}
