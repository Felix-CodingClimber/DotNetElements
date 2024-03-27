using System.Linq.Expressions;

namespace DotNetElements.Web.Blazor;

public static class DialogeServiceExtensions
{
    private static DialogOptions DefaultInfoDialogOptions => new()
    {
        CloseOnEscapeKey = true,
        DisableBackdropClick = false,
    };

    public static async Task<Result> ShowDeleteDialogAsync(this IDialogService dialogService, string title, string itemValue, string itemLabel)
    {
        var dialogParameters = new DialogParameters<DeleteDialog>
        {
            { x => x.ItemValue, itemValue },
            { x => x.ItemLabel, itemLabel }
        };

        IDialogReference dialog = await dialogService.ShowAsync<DeleteDialog>(title, dialogParameters);
        DialogResult result = await dialog.Result;

        return result.Canceled ? Result.Fail("Canceled by user") : Result.Ok();
    }

    public static async Task ShowInfoDialogAsync<TDialog, TParam>(this IDialogService dialogService, string title, Expression<Func<TDialog, TParam>> parameterPropertyExpression, TParam parameterValue, MaxWidth maxWidth = MaxWidth.Medium, bool fullWidth = true)
        where TDialog : InfoDialog
    {
        DialogParameters<TDialog> dialogParameters = new()
        {
            { parameterPropertyExpression, parameterValue }
        };

        DialogOptions options = DefaultInfoDialogOptions;
        options.MaxWidth = maxWidth;
        options.FullWidth = fullWidth;

        await dialogService.ShowAsync<TDialog>(title, dialogParameters, options);
    }

    public static async Task ShowInfoDialogAsync<TDialog>(this IDialogService dialogService, string title, MaxWidth maxWidth = MaxWidth.Medium, bool fullWidth = true, DialogParameters<TDialog>? parameters = null)
        where TDialog : InfoDialog
    {
        DialogOptions options = DefaultInfoDialogOptions;
        options.MaxWidth = maxWidth;
        options.FullWidth = fullWidth;

        await dialogService.ShowAsync<TDialog>(title, parameters, options);
    }
}
