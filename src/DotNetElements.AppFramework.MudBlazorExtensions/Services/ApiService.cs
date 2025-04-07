using System.Net.Http.Json;
using DotNetElements.AppFramework.MudBlazorExtensions.Extensions;
using Microsoft.Extensions.Logging;

namespace DotNetElements.AppFramework.MudBlazorExtensions.Services;

public class ApiService
{
    private readonly HttpClient httpClient;
    private readonly ISnackbar snackbar;
    private readonly ILogger<ApiService> logger;

    public ApiService(HttpClient httpClient, ISnackbar snackbar, ILogger<ApiService> logger)
    {
        this.httpClient = httpClient;
        this.snackbar = snackbar;
        this.logger = logger;
    }

    public Task<Result<TModel>> CreateAsync<TCreateModel, TModel>(string url, TCreateModel createModel, CancellationToken cancellationToken = default)
    {
        return PostAsync<TCreateModel, TModel>(
            url,
            createModel,
            SnackbarExtensions.DefaultMessageSuccessCreate,
            SnackbarExtensions.DefaultMessageFailureCreate,
            cancellationToken);
    }

    public Task<Result<TModel>> UpdateAsync<TEditModel, TModel>(string url, TEditModel editModel, CancellationToken cancellationToken = default)
    {
        return PutAsync<TEditModel, TModel>(
            url,
            editModel,
            SnackbarExtensions.DefaultMessageSuccessUpdate,
            SnackbarExtensions.DefaultMessageFailureUpdate,
            cancellationToken);
    }

    public async Task<Result<List<ModelWithDetails<TModel, TDetails>>>> GetModelsWithDetailsAsync<TModel, TDetails>(string url, CancellationToken cancellationToken = default)
        where TDetails : ModelDetails
    {
        Result<List<TModel>> result = await GetAsync<List<TModel>>(url, cancellationToken);

        if (!result.TryGetValue(out List<TModel>? returnValue))
            return Fail();

        return returnValue.Select(model => new ModelWithDetails<TModel, TDetails>(model)).ToList();
    }

    public async Task<Result<T>> GetAsync<T>(string url, CancellationToken cancellationToken = default)
    {
        HttpResponseMessage response = await httpClient.GetAsync(url, cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            logger.LogError("Error fetching data from {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);
            snackbar.NotifyFailureFetchData();

            return Fail();
        }

        T? content = await response.Content.ReadFromJsonAsync<T>(cancellationToken);

        if (content is null)
        {
            logger.LogError("Error deserializing type {type} from {url}: {statusCode} - {reasonPhrase}", typeof(T).Name, url, response.StatusCode, response.ReasonPhrase);
            snackbar.NotifyFailureFetchData();

            return Fail();
        }

        return content;
    }

    public async Task<Result> PostAsync(string url, string? messageOnSuccess = null, string? messageOnFail = null, CancellationToken cancellationToken = default)
    {
        HttpResponseMessage response = await httpClient.PostAsync(url, null, cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            logger.LogError("Error sending data to {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);

            if (messageOnFail is not null)
                snackbar.NotifyFailure(messageOnFail);

            return Fail();
        }

        if (messageOnSuccess is not null)
            snackbar.NotifySuccess(messageOnSuccess);

        return Ok();
    }

    public async Task<Result<TReturn>> PostAsync<TReturn>(string url, string? messageOnSuccess = null, string? messageOnFail = null, CancellationToken cancellationToken = default)
    {
        HttpResponseMessage response = await httpClient.PostAsync(url, null, cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            logger.LogError("Error sending data to {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);

            if (messageOnFail is not null)
                snackbar.NotifyFailure(messageOnFail);

            return Fail();
        }

        TReturn? content = await response.Content.ReadFromJsonAsync<TReturn>(cancellationToken);

        if (content is null)
        {
            logger.LogError("Error deserializing type {type} from {url}: {statusCode} - {reasonPhrase}", typeof(TReturn).Name, url, response.StatusCode, response.ReasonPhrase);

            if (messageOnFail is not null)
                snackbar.NotifyFailure(messageOnFail);

            return Fail();
        }

        if (messageOnSuccess is not null)
            snackbar.NotifySuccess(messageOnSuccess);

        return content;
    }

    public async Task<Result> PostAsync<T>(string url, T content, string? messageOnSuccess = null, string? messageOnFail = null, CancellationToken cancellationToken = default)
    {
        HttpResponseMessage response = await httpClient.PostAsJsonAsync(url, content, cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            logger.LogError("Error sending data to {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);

            if (messageOnFail is not null)
                snackbar.NotifyFailure(messageOnFail);

            return Fail();
        }

        if (messageOnSuccess is not null)
            snackbar.NotifySuccess(messageOnSuccess);

        return Ok();
    }

    public async Task<Result<TReturn>> PostAsync<T, TReturn>(string url, T content, string? messageOnSuccess = null, string? messageOnFail = null, CancellationToken cancellationToken = default)
    {
        HttpResponseMessage response = await httpClient.PostAsJsonAsync(url, content, cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            logger.LogError("Error sending data to {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);

            if (messageOnFail is not null)
                snackbar.NotifyFailure(messageOnFail);

            return Fail();
        }

        TReturn? returnContent = await response.Content.ReadFromJsonAsync<TReturn>(cancellationToken);

        if (returnContent is null)
        {
            logger.LogError("Error deserializing type {type} from {url}: {statusCode} - {reasonPhrase}", typeof(TReturn).Name, url, response.StatusCode, response.ReasonPhrase);

            if (messageOnFail is not null)
                snackbar.NotifyFailure(messageOnFail);

            return Fail();
        }

        if (messageOnSuccess is not null)
            snackbar.NotifySuccess(messageOnSuccess);

        return returnContent;
    }

    public async Task<Result> PutAsync(string url, string? messageOnSuccess = null, string? messageOnFail = null, CancellationToken cancellationToken = default)
    {
        HttpResponseMessage response = await httpClient.PutAsync(url, null, cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            logger.LogError("Error sending data to {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);

            if (messageOnFail is not null)
                snackbar.NotifyFailure(messageOnFail);

            return Fail();
        }

        if (messageOnSuccess is not null)
            snackbar.NotifySuccess(messageOnSuccess);

        return Ok();
    }

    public async Task<Result<TReturn>> PutAsync<TReturn>(string url, string? messageOnSuccess = null, string? messageOnFail = null, CancellationToken cancellationToken = default)
    {
        HttpResponseMessage response = await httpClient.PutAsync(url, null, cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            logger.LogError("Error sending data to {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);

            if (messageOnFail is not null)
                snackbar.NotifyFailure(messageOnFail);

            return Fail();
        }

        TReturn? content = await response.Content.ReadFromJsonAsync<TReturn>(cancellationToken);

        if (content is null)
        {
            logger.LogError("Error deserializing type {type} from {url}: {statusCode} - {reasonPhrase}", typeof(TReturn).Name, url, response.StatusCode, response.ReasonPhrase);

            if (messageOnFail is not null)
                snackbar.NotifyFailure(messageOnFail);

            return Fail();
        }

        if (messageOnSuccess is not null)
            snackbar.NotifySuccess(messageOnSuccess);

        return content;
    }

    public async Task<Result> PutAsync<T>(string url, T content, string? messageOnSuccess = null, string? messageOnFail = null, CancellationToken cancellationToken = default)
    {
        HttpResponseMessage response = await httpClient.PutAsJsonAsync(url, content, cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            logger.LogError("Error sending data to {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);

            if (messageOnFail is not null)
                snackbar.NotifyFailure(messageOnFail);

            return Fail();
        }

        if (messageOnSuccess is not null)
            snackbar.NotifySuccess(messageOnSuccess);

        return Ok();
    }

    public async Task<Result<TReturn>> PutAsync<T, TReturn>(string url, T content, string? messageOnSuccess = null, string? messageOnFail = null, CancellationToken cancellationToken = default)
    {
        HttpResponseMessage response = await httpClient.PutAsJsonAsync(url, content, cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            logger.LogError("Error sending data to {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);

            if (messageOnFail is not null)
                snackbar.NotifyFailure(messageOnFail);

            return Fail();
        }

        TReturn? returnContent = await response.Content.ReadFromJsonAsync<TReturn>(cancellationToken);

        if (returnContent is null)
        {
            logger.LogError("Error deserializing type {type} from {url}: {statusCode} - {reasonPhrase}", typeof(TReturn).Name, url, response.StatusCode, response.ReasonPhrase);

            if (messageOnFail is not null)
                snackbar.NotifyFailure(messageOnFail);

            return Fail();
        }

        if (messageOnSuccess is not null)
            snackbar.NotifySuccess(messageOnSuccess);

        return returnContent;
    }

    public async Task<Result> DeleteAsync(string url, CancellationToken cancellationToken = default)
    {
        HttpResponseMessage response = await httpClient.DeleteAsync(url, cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            logger.LogError("Error deleting data at {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);
            snackbar.NotifyFailureDeleteEntry();

            return Fail();
        }

        snackbar.NotifySuccessDeleteEntry();

        return Ok();
    }
}
