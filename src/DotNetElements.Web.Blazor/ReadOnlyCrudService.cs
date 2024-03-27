namespace DotNetElements.Web.Blazor;

public interface IReadOnlyCrudService<TKey, TModel, TDetails> : ICrudServiceBase<TKey, TModel>
    where TKey : notnull, IEquatable<TKey>
    where TModel : IModel<TKey>
    where TDetails : ModelDetails
{
    Task<Result<IReadOnlyList<ModelWithDetails<TModel, TDetails>>>> GetAllEntriesWithDetailsReadOnlyAsync();
    Task<Result<List<ModelWithDetails<TModel, TDetails>>>> GetAllEntriesWithDetailsAsync();
    Task<Result> GetEntryDetailsAsync(ModelWithDetails<TModel, TDetails> modelWithDetails);
}

public class ReadOnlyCrudService<TKey, TModel, TDetails> : CrudServiceBase<TKey, TModel>, IReadOnlyCrudService<TKey, TModel, TDetails>
    where TKey : notnull, IEquatable<TKey>
    where TModel : IModel<TKey>
    where TDetails : ModelDetails
{
    public ReadOnlyCrudService(ISnackbar snackbar, HttpClient httpClient, CrudOptions<TModel> options) : base(snackbar, httpClient, options)
    {
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
