namespace DotNetElements.Web.Blazor;

public interface ICrudServiceBase<TKey, TModel>
    where TKey : notnull, IEquatable<TKey>
    where TModel : IModel<TKey>
{
    Task<Result<TModel>> GetEntryByIdAsync(TKey id);
    Task<Result<IReadOnlyList<TModel>>> GetAllEntriesReadOnlyAsync();
    Task<Result<List<TModel>>> GetAllEntriesAsync();
}

public class CrudServiceBase<TKey, TModel> : ICrudServiceBase<TKey, TModel>
    where TKey : notnull, IEquatable<TKey>
    where TModel : IModel<TKey>
{
    protected readonly ISnackbar Snackbar;
    protected readonly HttpClient HttpClient;
    protected readonly CrudOptions<TModel> Options;

    public CrudServiceBase(ISnackbar snackbar, HttpClient httpClient, CrudOptions<TModel> options)
    {
        Snackbar = snackbar;
        HttpClient = httpClient;
        Options = options;
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
}
