using System.Net.Http.Json;
using System.Text;
using System.Text.Json;

namespace DotNetElements.Web.MudBlazor;

public static class HttpClientExtensions
{
    public static async Task<Result<List<ModelWithDetails<TModel, TDetails>>>> GetModelWithDetailsListFromJsonAsync<TModel, TDetails>(this HttpClient httpClient, string? requestUri, JsonSerializerOptions? options = null, CancellationToken cancellationToken = default)
        where TDetails : ModelDetails
    {
        HttpResponseMessage response = await httpClient.GetAsync(requestUri, cancellationToken);

        if (!response.IsSuccessStatusCode)
            return Result.Fail($"Get request failed with status: {response.StatusCode} and reason: {response.ReasonPhrase}");

        List<ModelWithDetails<TModel, TDetails>>? returnValue = await response.Content.ReadFromJsonAsync<List<ModelWithDetails<TModel, TDetails>>>(cancellationToken);

        return Result.OkIfNotNull(returnValue, $"Failed to convert response content to type ModelWithDetails<{typeof(TModel)}, {typeof(TDetails)}>");
    }

    public static async Task<Result<T>> GetFromJsonWithResultAsync<T>(this HttpClient httpClient, string? requestUri, JsonSerializerOptions? options = null, CancellationToken cancellationToken = default)
    {
        HttpResponseMessage response = await httpClient.GetAsync(requestUri, cancellationToken);

        if (!response.IsSuccessStatusCode)
            return Result.Fail($"Get request failed with status: {response.StatusCode} and reason: {response.ReasonPhrase}");

        T? returnValue = await response.Content.ReadFromJsonAsync<T>(cancellationToken);

        return Result.OkIfNotNull(returnValue, $"Failed to convert response content to type {typeof(T)}");
    }

    public static async Task<Result<T>> PostAsJsonWithResultAsync<T>(this HttpClient httpClient, string? requestUri, T value, JsonSerializerOptions? options = null, CancellationToken cancellationToken = default)
    {
        HttpResponseMessage response = await httpClient.PostAsJsonAsync<T>(requestUri, value, options, cancellationToken);

        if (!response.IsSuccessStatusCode)
            return Result.Fail($"Post request failed with status: {response.StatusCode} and reason: {response.ReasonPhrase}");

        T? returnValue = await response.Content.ReadFromJsonAsync<T>(cancellationToken);

        return Result.OkIfNotNull(returnValue, $"Failed to convert response content to type {typeof(T)}");
    }

    public static async Task<Result<T>> PutAsJsonWithResultAsync<T>(this HttpClient httpClient, string? requestUri, T value, JsonSerializerOptions? options = null, CancellationToken cancellationToken = default)
    {
        HttpResponseMessage response = await httpClient.PutAsJsonAsync<T>(requestUri, value, options, cancellationToken);

        if (!response.IsSuccessStatusCode)
            return Result.Fail($"Put request failed with status: {response.StatusCode} and reason: {response.ReasonPhrase}");

        T? returnValue = await response.Content.ReadFromJsonAsync<T>(cancellationToken);

        return Result.OkIfNotNull(returnValue, $"Failed to convert response content to type {typeof(T)}");
    }

    public static async Task<Result<TResult>> PostAsJsonWithResultAsync<TValue, TResult>(this HttpClient httpClient, string? requestUri, TValue value, JsonSerializerOptions? options = null, CancellationToken cancellationToken = default)
    {
        HttpResponseMessage response = await httpClient.PostAsJsonAsync<TValue>(requestUri, value, options, cancellationToken);

        if (!response.IsSuccessStatusCode)
            return Result.Fail($"Post request failed with status: {response.StatusCode} and reason: {response.ReasonPhrase}");

        TResult? returnValue = await response.Content.ReadFromJsonAsync<TResult>(cancellationToken);

        return Result.OkIfNotNull(returnValue, $"Failed to convert response content to type {typeof(TResult)}");
    }

    public static async Task<Result<TResult>> PutAsJsonWithResultAsync<TValue, TResult>(this HttpClient httpClient, string? requestUri, TValue value, JsonSerializerOptions? options = null, CancellationToken cancellationToken = default)
    {
        HttpResponseMessage response = await httpClient.PutAsJsonAsync<TValue>(requestUri, value, options, cancellationToken);

        if (!response.IsSuccessStatusCode)
            return Result.Fail($"Put request failed with status: {response.StatusCode} and reason: {response.ReasonPhrase}");

        TResult? returnValue = await response.Content.ReadFromJsonAsync<TResult>(cancellationToken);

        return Result.OkIfNotNull(returnValue, $"Failed to convert response content to type {typeof(TResult)}");
    }

    public static async Task<Result> DeleteWithResultAsync<T>(this HttpClient httpClient, string? requestUri, T value, JsonSerializerOptions? options = null)
    {
        HttpResponseMessage response = await httpClient.DeleteAsJsonAsync<T>(requestUri, value, options);

        return Result.OkIf(response.IsSuccessStatusCode, $"Delete request failed with status: {response.StatusCode} and reason: {response.ReasonPhrase}");
    }

    public static Task<HttpResponseMessage> DeleteAsJsonAsync<T>(this HttpClient httpClient, string? requestUri, T value, JsonSerializerOptions? options = null)
    {
        return httpClient.SendAsync(new HttpRequestMessage(HttpMethod.Delete, requestUri) { Content = Serialize(value, options) });
    }

    private static StringContent Serialize<T>(T value, JsonSerializerOptions? options = null)
    {
        return new StringContent(JsonSerializer.Serialize(value, options), Encoding.UTF8, "application/json");
    }
}
