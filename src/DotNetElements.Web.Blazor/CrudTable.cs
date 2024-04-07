namespace DotNetElements.Web.Blazor;

public static class CrudTable
{
    public static DialogOptions DefaultEditDialogOptions => new DialogOptions() { MaxWidth = MaxWidth.Medium, FullWidth = true, DisableBackdropClick = true };
}

// todo use CrudService
public abstract class CrudTable<TKey, TModel, TDetails, TEditModel, TEditDialog> : CrudTable<TKey, TModel, TDetails, TEditModel>
    where TKey : notnull, IEquatable<TKey>
    where TModel : IModel<TKey>
    where TDetails : ModelDetails
    where TEditModel : IMapFromModel<TEditModel, TModel>, ICreateNew<TEditModel>
    where TEditDialog : CrudEditDialog<TModel, TEditModel>
{
    public override async Task OnCreateEntry()
    {
        TEditModel newModel = TEditModel.Empty();

        var parameters = new DialogParameters<TEditDialog>
        {
            { x => x.IsEditMode, false },
            { x => x.Model, newModel },
            { x => x.EditContext, new EditContext(newModel) },
            { x => x.ApiEndpoint, Options.BaseEndpointUri }
        };

        var dialog = await DialogService.ShowAsync<TEditDialog>("New entry", parameters, Options.EditDialogOptions);
        var result = await dialog.Result;

        if (result.Canceled)
            return;

        Result<TModel> dialogResult = (Result<TModel>)result.Data;

        if (dialogResult.IsOk)
        {
            Snackbar.Add("Entry saved", Severity.Success);
            TableEntries.Add(new ModelWithDetails<TModel, TDetails>(dialogResult.Value));
        }
        else
        {
            Snackbar.Add("Failed to save entry", Severity.Error);
        }
    }

    protected override async Task OnEditEntry(ModelWithDetails<TModel, TDetails> context)
    {
        TEditModel editModel = TEditModel.MapFromModel(context.Value);

        var parameters = new DialogParameters<TEditDialog>
        {
            { x => x.IsEditMode, true },
            { x => x.Model, editModel },
            { x => x.EditContext, new EditContext(editModel) },
            { x => x.ApiEndpoint, Options.BaseEndpointUri }
        };

        var dialog = await DialogService.ShowAsync<TEditDialog>("Edit entry", parameters, Options.EditDialogOptions);
        var result = await dialog.Result;

        if (result.Canceled)
            return;

        Result<TModel> dialogResult = (Result<TModel>)result.Data;

        if (dialogResult.IsOk)
        {
            Snackbar.Add("Changes saved", Severity.Success);
            context.Value = dialogResult.Value;
        }
        else
        {
            Snackbar.Add("Failed to save changes", Severity.Error);
        }
    }

    protected async Task<Result<TDialogModel>> ShowCrudEditDialogAsync<TDialog, TDialogModel, TDialogEditModel>(
        bool isEditMode,
        string title,
        string apiEndpoint,
        TDialogEditModel editModel,
        DialogParameters<TDialog>? additionalParameters = null,
        DialogOptions? dialogOptions = null)
        where TDialog : CrudEditDialog<TDialogModel, TDialogEditModel>
        where TDialogEditModel : notnull
    {
        DialogParameters<TDialog> parameters = new()
        {
            { x => x.IsEditMode, isEditMode },
            { x => x.Model, editModel },
            { x => x.EditContext, new EditContext(editModel) },
            { x => x.ApiEndpoint, apiEndpoint }
        };

        foreach ((string key, object value) in additionalParameters ?? [])
            parameters.Add(key, value);

        IDialogReference dialog = await DialogService.ShowAsync<TDialog>(title, parameters, dialogOptions ?? CrudTable.DefaultEditDialogOptions);
        DialogResult result = await dialog.Result;

        Result<TDialogModel> dialogResult = (Result<TDialogModel>)result.Data;

        if (dialogResult.IsOk)
        {
            Snackbar.Add("Entry saved", Severity.Success);
        }
        else
        {
            Snackbar.Add("Failed to save entry", Severity.Error);
        }

        return dialogResult;
    }
}

