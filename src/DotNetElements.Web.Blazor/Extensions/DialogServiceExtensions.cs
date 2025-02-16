using System.Linq.Expressions;

namespace DotNetElements.Web.Blazor.Extensions;

public static class DialogServiceExtensions
{
    private static DialogOptions DefaultInfoDialogOptions(MaxWidth maxWidth, bool fullWidth) => new()
    {
        CloseOnEscapeKey = true,
        BackdropClick = true,
        MaxWidth = maxWidth,
        FullWidth = fullWidth
    };

    // todo rename to ShowSoftDeleteDialogAsync
    public static async Task<Result> ShowDeleteDialogAsync(this IDialogService dialogService, string title, string itemValue, string itemLabel, string? additionalMessage = null)
    {
        var dialogParameters = new DialogParameters<DeleteDialog>
        {
            { x => x.IsHardDelete, false },
            { x => x.AdditionalMessage, additionalMessage },
            { x => x.ItemValue, itemValue },
            { x => x.ItemLabel, itemLabel }
        };

        IDialogReference dialog = await dialogService.ShowAsync<DeleteDialog>(title, dialogParameters);
        DialogResult? result = await dialog.Result;

        return result?.Canceled is not false ? Result.Fail("Canceled by user") : Result.Ok();
    }

    public static async Task<Result> ShowHardDeleteDialogAsync(this IDialogService dialogService, string title, string itemValue, string itemLabel, string? additionalMessage = null)
    {
        var dialogParameters = new DialogParameters<DeleteDialog>
        {
            { x => x.IsHardDelete, true },
            { x => x.AdditionalMessage, additionalMessage },
            { x => x.ItemValue, itemValue },
            { x => x.ItemLabel, itemLabel }
        };

        IDialogReference dialog = await dialogService.ShowAsync<DeleteDialog>(title, dialogParameters);
        DialogResult? result = await dialog.Result;

        return result?.Canceled is not false ? Result.Fail("Canceled by user") : Result.Ok();
    }

    public static async Task ShowInfoDialogAsync<TDialog, TParam>(this IDialogService dialogService, string title, Expression<Func<TDialog, TParam>> parameterPropertyExpression, TParam parameterValue, MaxWidth maxWidth = MaxWidth.Medium, bool fullWidth = true)
        where TDialog : InfoDialog
    {
        DialogParameters<TDialog> dialogParameters = new()
        {
            { parameterPropertyExpression, parameterValue }
        };

        DialogOptions options = DefaultInfoDialogOptions(maxWidth, fullWidth);

        await dialogService.ShowAsync<TDialog>(title, dialogParameters, options);
    }

    public static async Task ShowInfoDialogAsync<TDialog>(this IDialogService dialogService, string title, MaxWidth maxWidth = MaxWidth.Medium, bool fullWidth = true, DialogParameters<TDialog>? parameters = null)
        where TDialog : InfoDialog
    {
        DialogOptions options = DefaultInfoDialogOptions(maxWidth, fullWidth);

        parameters ??= [];

        await dialogService.ShowAsync<TDialog>(title, parameters, options);
    }
}
