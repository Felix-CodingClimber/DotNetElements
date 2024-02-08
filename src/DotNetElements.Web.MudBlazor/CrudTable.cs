namespace DotNetElements.Web.MudBlazor;

public static class CrudTable
{
    public static readonly DialogOptions DefaultEditDialogOptions = new DialogOptions() { MaxWidth = MaxWidth.Medium, FullWidth = true, DisableBackdropClick = true };
}

// todo used CrudService
public abstract class CrudTable<TKey, TModel, TDetails, TEditModel, TEditDialog> : MudComponentBase
    where TKey : notnull, IEquatable<TKey>
    where TModel : IModel<TKey>
    where TDetails : ModelDetails
    where TEditModel : IMapFromModel<TEditModel, TModel>, ICreateNew<TEditModel>
    where TEditDialog : CrudEditDialog<TModel, TEditModel>
{
    [Inject]
    protected ISnackbar Snackbar { get; set; } = default!;

    [Inject]
    protected IDialogService DialogService { get; set; } = default!;

    [Inject]
    protected HttpClient HttpClient { get; set; } = default!;

    protected List<ModelWithDetails<TModel, TDetails>> TableEntries { get; set; } = [];

    protected bool IsLoaded;

    private readonly CrudTableOptions<TModel> options;

    public CrudTable()
    {
        options = OnConfiguring();
    }

    protected abstract CrudTableOptions<TModel> OnConfiguring();

    protected override async Task OnInitializedAsync()
    {
        await UpdateEntries();

        IsLoaded = true;
    }

    public async Task OnCreateEntry()
    {
        TEditModel newModel = TEditModel.Empty();

        var parameters = new DialogParameters<TEditDialog>
        {
            { x => x.IsEditMode, false },
            { x => x.Model, newModel },
            { x => x.EditContext, new EditContext(newModel) },
            { x => x.ApiEndpoint, options.BaseEndpointUri }
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

    protected async Task OnEditEntry(ModelWithDetails<TModel, TDetails> context)
    {
        TEditModel editModel = TEditModel.MapFromModel(context.Value);

        var parameters = new DialogParameters<TEditDialog>
        {
            { x => x.IsEditMode, true },
            { x => x.Model, editModel },
            { x => x.EditContext, new EditContext(context.Value) },
            { x => x.ApiEndpoint, options.BaseEndpointUri }
        };

        var dialog = await DialogService.ShowAsync<TEditDialog>("Edit entry", parameters, options.EditDialogOptions);
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

    protected async Task OnDeleteEntry(ModelWithDetails<TModel, TDetails> context)
    {
        Result canDelete = await DialogService.ShowDeleteDialogAsync($"Delete {options.DeleteEntryLabel}?", options.DeleteEntryValue.Invoke(context.Value), options.DeleteEntryLabel);

        if (canDelete.IsFail)
            return;

        Result result = await HttpClient.DeleteWithResultAsync(options.BaseEndpointUri, context.Value);

        if (result.IsOk)
        {
            Snackbar.Add("Entry deleted", Severity.Success);
            TableEntries.Remove(context);
        }
        else
        {
            Snackbar.Add("Failed to delete entry", Severity.Error);
        }
    }

    protected async Task OnShowEntryDetails(ModelWithDetails<TModel, TDetails> context)
    {
        if (context.DetailsShown)
        {
            context.DetailsShown = false;
            return;
        }

        Result<TDetails> details = await HttpClient.GetFromJsonWithResultAsync<TDetails>(options.GetDetailsEndpoint(context.Value.Id.ToString()));

        if (details.IsFail)
        {
            Snackbar.Add($"Failed to fetch details.\n{details.ErrorMessage}", Severity.Error);
            return;
        }

        context.Details = details.Value;
        context.DetailsShown = true;
    }

    protected async Task UpdateEntries()
    {
        Result<List<ModelWithDetails<TModel, TDetails>>> result = await HttpClient.GetModelWithDetailsListFromJsonAsync<TModel, TDetails>(options.GetAllWithDetailsEndpoint);

        if (result.IsFail)
        {
            Snackbar.Add("Failed to fetch entries from server", Severity.Error);
            return;
        }

        TableEntries = result.Value;
    }
}

