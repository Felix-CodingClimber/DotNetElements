namespace DotNetElements.Web.Blazor;

public interface ICrudService<TKey, TModel, TDetails, TEditModel> : IReadOnlyCrudService<TKey, TModel, TDetails>
    where TKey : notnull, IEquatable<TKey>
    where TModel : IModel<TKey>
    where TDetails : ModelDetails
    where TEditModel : IMapFromModel<TEditModel, TModel>, ICreateNew<TEditModel>
{
    Task<Result<TModel>> CreateEntryAsync(TEditModel editModel);
    Task<Result> DeleteEntryAsync(TModel model);
    Task<Result<TModel>> UpdateEntryAsync(TEditModel editModel);
}

public class CrudService<TKey, TModel, TDetails, TEditModel> : ReadOnlyCrudService<TKey, TModel, TDetails>, ICrudService<TKey, TModel, TDetails, TEditModel>
    where TKey : notnull, IEquatable<TKey>
    where TModel : IModel<TKey>
    where TDetails : ModelDetails
    where TEditModel : IMapFromModel<TEditModel, TModel>, ICreateNew<TEditModel>
{
    public CrudService(ISnackbar snackbar, HttpClient httpClient, CrudOptions<TModel> options) : base(snackbar, httpClient, options)
    {
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
}
