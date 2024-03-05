namespace DotNetElements.Web.Blazor;

public static class CrudTable
{
    public static readonly DialogOptions DefaultEditDialogOptions = new DialogOptions() { MaxWidth = MaxWidth.Medium, FullWidth = true, DisableBackdropClick = true };
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

        var dialog = await DialogService.ShowAsync<TEditDialog>("New entry", parameters);
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
            { x => x.EditContext, new EditContext(context.Value) },
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
}

