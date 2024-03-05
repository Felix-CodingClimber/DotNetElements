namespace DotNetElements.Web.Blazor;

// todo use CrudService
public abstract class CrudTable<TKey, TModel, TDetails, TEditModel> : MudComponentBase
    where TKey : notnull, IEquatable<TKey>
    where TModel : IModel<TKey>
    where TDetails : ModelDetails
    where TEditModel : IMapFromModel<TEditModel, TModel>, ICreateNew<TEditModel>
{
    [Inject]
    protected ISnackbar Snackbar { get; set; } = default!;

    [Inject]
    protected IDialogService DialogService { get; set; } = default!;

    [Inject]
    protected HttpClient HttpClient { get; set; } = default!;

    protected List<ModelWithDetails<TModel, TDetails>> TableEntries { get; set; } = [];

    protected bool IsLoaded;

    protected readonly CrudTableOptions<TModel> Options;

    public CrudTable()
    {
        Options = OnConfiguring();
    }

    protected abstract CrudTableOptions<TModel> OnConfiguring();

    protected override async Task OnInitializedAsync()
    {
        await UpdateEntries();

        IsLoaded = true;
    }

    public virtual Task OnCreateEntry() { return Task.CompletedTask; }

    protected virtual Task OnEditEntry(ModelWithDetails<TModel, TDetails> context) { return Task.CompletedTask; }

    protected virtual async Task OnDeleteEntry(ModelWithDetails<TModel, TDetails> context)
    {
        Result canDelete = await DialogService.ShowDeleteDialogAsync($"Delete {Options.DeleteEntryLabel}?", Options.DeleteEntryValue.Invoke(context.Value), Options.DeleteEntryLabel);

        if (canDelete.IsFail)
            return;

        Result result = await HttpClient.DeleteWithResultAsync(Options.BaseEndpointUri, context.Value);

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

    protected virtual async Task OnShowEntryDetails(ModelWithDetails<TModel, TDetails> context)
    {
        if (context.DetailsShown)
        {
            context.DetailsShown = false;
            return;
        }

        Result<TDetails> details = await HttpClient.GetFromJsonWithResultAsync<TDetails>(Options.GetDetailsEndpoint(context.Value.Id.ToString()));

        if (details.IsFail)
        {
            Snackbar.Add($"Failed to fetch details.\n{details.ErrorMessage}", Severity.Error);
            return;
        }

        context.Details = details.Value;
        context.DetailsShown = true;
    }

    protected virtual async Task UpdateEntries()
    {
        Result<List<ModelWithDetails<TModel, TDetails>>> result = await HttpClient.GetModelWithDetailsListFromJsonAsync<TModel, TDetails>(Options.GetAllWithDetailsEndpoint);

        if (result.IsFail)
        {
            Snackbar.Add("Failed to fetch entries from server", Severity.Error);
            return;
        }

        TableEntries = result.Value;
    }
}

