namespace DotNetElements.Web.Blazor;

public interface ICrudService<TKey, TModel, TDetails, TEditModel>
    where TKey : notnull, IEquatable<TKey>
    where TModel : IModel<TKey>
    where TDetails : ModelDetails
    where TEditModel : IMapFromModel<TEditModel, TModel>, ICreateNew<TEditModel>
{
    Task<Result<TModel>> CreateEntryAsync(TEditModel editModel);
    Task<Result> DeleteEntryAsync(TModel model);
    Task<Result<TModel>> GetEntryByIdAsync(TKey id);
    Task<Result<IReadOnlyList<TModel>>> GetAllEntriesReadOnlyAsync();
    Task<Result<List<TModel>>> GetAllEntriesAsync();
    Task<Result<IReadOnlyList<ModelWithDetails<TModel, TDetails>>>> GetAllEntriesWithDetailsReadOnlyAsync();
    Task<Result<List<ModelWithDetails<TModel, TDetails>>>> GetAllEntriesWithDetailsAsync();
    Task<Result> GetEntryDetailsAsync(ModelWithDetails<TModel, TDetails> modelWithDetails);
    Task<Result<TModel>> UpdateEntryAsync(TEditModel editModel);
}

public class CrudService<TKey, TModel, TDetails, TEditModel> : ICrudService<TKey, TModel, TDetails, TEditModel> where TKey : notnull, IEquatable<TKey>
    where TModel : IModel<TKey>
    where TDetails : ModelDetails
    where TEditModel : IMapFromModel<TEditModel, TModel>, ICreateNew<TEditModel>
{
    protected readonly ISnackbar Snackbar;
    protected readonly HttpClient HttpClient;
    protected readonly CrudOptions<TModel> Options;

    public CrudService(ISnackbar snackbar, HttpClient httpClient, CrudOptions<TModel> options)
    {
        Snackbar = snackbar;
        HttpClient = httpClient;
        Options = options;
    }

    public virtual async Task<Result<TModel>> CreateEntryAsync(TEditModel editModel)
    {
        Result<TModel> result = await HttpClient.PutAsJsonWithResultAsync<TEditModel, TModel>(Options.BaseEndpointUri, editModel);

        // todo add logging
        // todo wrap Snackbar call in bool option NotifyUser
        // todo add function OnDeleteSuccess
        if (result.IsOk)
        {
            Snackbar.Add("Entry saved", Severity.Success);
        }
        else
        {
            Snackbar.Add("Failed to save entry", Severity.Error);
        }

        return result;
    }

    public virtual async Task<Result<TModel>> UpdateEntryAsync(TEditModel editModel)
    {
        Result<TModel> result = await HttpClient.PostAsJsonWithResultAsync<TEditModel, TModel>(Options.BaseEndpointUri, editModel);

        // todo add logging
        // todo wrap Snackbar call in bool option NotifyUser
        // todo add function OnDeleteSuccess
        if (result.IsOk)
        {
            Snackbar.Add("Changes saved", Severity.Success);
        }
        else
        {
            Snackbar.Add("Failed to save changes", Severity.Error);
        }

        return result;
    }

    public virtual async Task<Result> DeleteEntryAsync(TModel model)
    {
        Result result = await HttpClient.DeleteWithResultAsync(Options.BaseEndpointUri, model);

        // todo add logging
        // todo wrap Snackbar call in bool option NotifyUser
        // todo add function OnDeleteSuccess
        if (result.IsOk)
        {
            Snackbar.Add("Entry deleted", Severity.Success);
        }
        else
        {
            Snackbar.Add("Failed to delete entry", Severity.Error);
        }

        return result;
    }

    public virtual async Task<Result<TModel>> GetEntryByIdAsync(TKey id)
    {
        Result<TModel> result = await HttpClient.GetFromJsonWithResultAsync<TModel>(Options.GetByIdEndpoint(id));

        // todo add logging
        // todo wrap Snackbar call in bool option NotifyUser
        // todo add function OnDeleteSuccess
        if (result.IsFail)
        {
            Snackbar.Add("Failed to fetch entry from server", Severity.Error);
        }

        return result;
    }

    public virtual async Task<Result> GetEntryDetailsAsync(ModelWithDetails<TModel, TDetails> modelWithDetails)
    {
        Result<TDetails> detailsResult = await HttpClient.GetFromJsonWithResultAsync<TDetails>(Options.GetDetailsEndpoint(modelWithDetails.Value.Id.ToString()));

        // todo add logging
        // todo wrap Snackbar call in bool option NotifyUser
        // todo add function OnDeleteSuccess
        if (detailsResult.IsFail)
        {
            Snackbar.Add($"Failed to fetch details.\n{detailsResult.ErrorMessage}", Severity.Error);
            return detailsResult;
        }

        modelWithDetails.Details = detailsResult.Value;

        return detailsResult;
    }

    public virtual async Task<Result<IReadOnlyList<TModel>>> GetAllEntriesReadOnlyAsync()
    {
        Result<IReadOnlyList<TModel>> result = await HttpClient.GetFromJsonWithResultAsync<IReadOnlyList<TModel>>(Options.GetAllEndpoint);

        // todo add logging
        // todo wrap Snackbar call in bool option NotifyUser
        // todo add function OnDeleteSuccess
        if (result.IsFail)
        {
            Snackbar.Add("Failed to fetch entries from server", Severity.Error);
        }

        return result;
    }

    public virtual async Task<Result<List<TModel>>> GetAllEntriesAsync()
    {
        Result<List<TModel>> result = await HttpClient.GetFromJsonWithResultAsync<List<TModel>>(Options.GetAllEndpoint);

        // todo add logging
        // todo wrap Snackbar call in bool option NotifyUser
        // todo add function OnDeleteSuccess
        if (result.IsFail)
        {
            Snackbar.Add("Failed to fetch entries from server", Severity.Error);
        }

        return result;
    }

    public virtual async Task<Result<IReadOnlyList<ModelWithDetails<TModel, TDetails>>>> GetAllEntriesWithDetailsReadOnlyAsync()
    {
        Result<List<ModelWithDetails<TModel, TDetails>>> result = await HttpClient.GetModelWithDetailsListFromJsonAsync<TModel, TDetails>(Options.GetAllEndpoint);

        // todo add logging
        // todo wrap Snackbar call in bool option NotifyUser
        // todo add function OnDeleteSuccess
        if (result.IsFail)
        {
            Snackbar.Add("Failed to fetch entries from server", Severity.Error);
        }

        return Result.Ok(result.Value as IReadOnlyList<ModelWithDetails<TModel, TDetails>>);
    }

    public virtual async Task<Result<List<ModelWithDetails<TModel, TDetails>>>> GetAllEntriesWithDetailsAsync()
    {
        Result<List<ModelWithDetails<TModel, TDetails>>> result = await HttpClient.GetModelWithDetailsListFromJsonAsync<TModel, TDetails>(Options.GetAllEndpoint);

        // todo add logging
        // todo wrap Snackbar call in bool option NotifyUser
        // todo add function OnDeleteSuccess
        if (result.IsFail)
        {
            Snackbar.Add("Failed to fetch entries from server", Severity.Error);
        }

        return result;
    }
}
