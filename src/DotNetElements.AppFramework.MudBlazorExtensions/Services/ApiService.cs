using System.Net.Http.Json;
using DotNetElements.AppFramework.MudBlazorExtensions.Extensions;
using DotNetElements.AppFramework.MudBlazorExtensions.Util;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Logging;

namespace DotNetElements.AppFramework.MudBlazorExtensions.Services;

public class ApiService
{
	private static readonly ErrorDetails ClientFailErrorDetails = new()
	{
		Type = "Client.HandleResponseError",
		Title = "Client Error",
		Details = "Failed to handle response"
	};

	private static readonly ErrorDetails CancelledByUserErrorDetails = new()
	{
		Type = "Client.CancelledByUser",
		Title = "Cancelled By User"
	};

	private readonly HttpClient httpClient;
	private readonly ISnackbar snackbar;
	private readonly IDialogService dialogService;
	private readonly ILogger<ApiService> logger;

	public ApiService(HttpClient httpClient, ISnackbar snackbar, IDialogService dialogService, ILogger<ApiService> logger)
	{
		this.httpClient = httpClient;
		this.snackbar = snackbar;
		this.dialogService = dialogService;
		this.logger = logger;
	}

	public Task<ApiResult<TModel>> CreateAsync<TCreateModel, TModel>(string url, TCreateModel createModel, bool noMessage = false, CancellationToken cancellationToken = default)
	{
		return PostAsync<TCreateModel, TModel>(
			url,
			createModel,
			SnackbarExtensions.DefaultMessageSuccessCreate,
			SnackbarExtensions.DefaultMessageFailureCreate,
			noMessage,
			cancellationToken);
	}

	public Task<ApiResult<TModel>> UpdateAsync<TEditModel, TModel>(string url, TEditModel editModel, bool noMessage = false, CancellationToken cancellationToken = default)
	{
		return PutAsync<TEditModel, TModel>(
			url,
			editModel,
			SnackbarExtensions.DefaultMessageSuccessUpdate,
			SnackbarExtensions.DefaultMessageFailureUpdate,
			noMessage,
			cancellationToken);
	}

	public Task<ApiResult> UpdateAsync<TEditModel>(string url, TEditModel editModel, bool noMessage = false, CancellationToken cancellationToken = default)
	{
		return PutAsync<TEditModel>(
			url,
			editModel,
			SnackbarExtensions.DefaultMessageSuccessUpdate,
			SnackbarExtensions.DefaultMessageFailureUpdate,
			noMessage,
			cancellationToken);
	}

	public async Task<ApiResult<List<ModelWithDetails<TModel, TDetails>>>> GetModelsWithDetailsAsync<TModel, TDetails>(string url, bool noMessage = false, CancellationToken cancellationToken = default)
		where TDetails : ModelDetails
	{
		ApiResult<List<TModel>> result = await GetAsync<List<TModel>>(url, noMessage, cancellationToken);

		if (!result.TryGetValue(out List<TModel>? returnValue, out ErrorDetails? error))
			return Fail(error.Value);

		return returnValue.Select(model => new ModelWithDetails<TModel, TDetails>(model)).ToList();
	}

	public async Task<ApiResult<T>> GetAsync<T>(string url, bool noMessage = false, CancellationToken cancellationToken = default)
	{
		HttpResponseMessage response = await httpClient.GetAsync(url, cancellationToken);

		if (!response.IsSuccessStatusCode)
		{
			logger.LogError("Error fetching data from {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);

			ProblemDetails? problemDetails = await ReadProblemDetailsAsync(response, cancellationToken);

			if (!noMessage)
				NotifyFailure(SnackbarExtensions.DefaultMessageFailureFetch, problemDetails);

			if (problemDetails is not null)
				return Fail(problemDetails.ToErrorDetails());
		}

		T? content = await response.Content.ReadFromJsonAsync<T>(cancellationToken);

		if (content is null)
		{
			logger.LogError("Error deserializing type {type} from {url}: {statusCode} - {reasonPhrase}", typeof(T).Name, url, response.StatusCode, response.ReasonPhrase);

			if (!noMessage)
				snackbar.NotifyFailure(SnackbarExtensions.DefaultMessageFailureFetch);

			return Fail(ClientFailErrorDetails);
		}

		return content;
	}

	public async Task<ApiResult> PostAsync(string url, string? messageOnSuccess = null, string? messageOnFail = null, bool noMessage = false, CancellationToken cancellationToken = default)
	{
		HttpResponseMessage response = await httpClient.PostAsync(url, null, cancellationToken);

		if (!response.IsSuccessStatusCode)
		{
			logger.LogError("Error sending data to {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);

			ProblemDetails? problemDetails = await ReadProblemDetailsAsync(response, cancellationToken);

			if (!noMessage)
				NotifyFailure(messageOnFail, problemDetails);

			if (problemDetails is not null)
				return Fail(problemDetails.ToErrorDetails());
		}

		if (!noMessage && messageOnSuccess is not null)
			snackbar.NotifySuccess(messageOnSuccess);

		return Ok();
	}

	public async Task<ApiResult<TReturn>> PostAsync<TReturn>(string url, string? messageOnSuccess = null, string? messageOnFail = null, bool noMessage = false, CancellationToken cancellationToken = default)
	{
		HttpResponseMessage response = await httpClient.PostAsync(url, null, cancellationToken);

		if (!response.IsSuccessStatusCode)
		{
			logger.LogError("Error sending data to {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);

			ProblemDetails? problemDetails = await ReadProblemDetailsAsync(response, cancellationToken);

			if (!noMessage)
				NotifyFailure(messageOnFail, problemDetails);

			if (problemDetails is not null)
				return Fail(problemDetails.ToErrorDetails());
		}

		TReturn? content = await response.Content.ReadFromJsonAsync<TReturn>(cancellationToken);

		if (content is null)
		{
			logger.LogError("Error deserializing type {type} from {url}: {statusCode} - {reasonPhrase}", typeof(TReturn).Name, url, response.StatusCode, response.ReasonPhrase);

			if (!noMessage && messageOnFail is not null)
				snackbar.NotifyFailure(messageOnFail);

			return Fail(ClientFailErrorDetails);
		}

		if (!noMessage && messageOnSuccess is not null)
			snackbar.NotifySuccess(messageOnSuccess);

		return content;
	}

	public async Task<ApiResult> PostAsync<T>(string url, T content, string? messageOnSuccess = null, string? messageOnFail = null, bool noMessage = false, CancellationToken cancellationToken = default)
	{
		HttpResponseMessage response = await httpClient.PostAsJsonAsync(url, content, cancellationToken);

		if (!response.IsSuccessStatusCode)
		{
			logger.LogError("Error sending data to {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);

			ProblemDetails? problemDetails = await ReadProblemDetailsAsync(response, cancellationToken);

			if (!noMessage)
				NotifyFailure(messageOnFail, problemDetails);

			if (problemDetails is not null)
				return Fail(problemDetails.ToErrorDetails());
		}

		if (!noMessage && messageOnSuccess is not null)
			snackbar.NotifySuccess(messageOnSuccess);

		return Ok();
	}

	public async Task<ApiResult<TReturn>> PostAsync<T, TReturn>(string url, T content, string? messageOnSuccess = null, string? messageOnFail = null, bool noMessage = false, CancellationToken cancellationToken = default)
	{
		HttpResponseMessage response = await httpClient.PostAsJsonAsync(url, content, cancellationToken);

		if (!response.IsSuccessStatusCode)
		{
			logger.LogError("Error sending data to {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);

			ProblemDetails? problemDetails = await ReadProblemDetailsAsync(response, cancellationToken);

			if (!noMessage)
				NotifyFailure(messageOnFail, problemDetails);

			if (problemDetails is not null)
				return Fail(problemDetails.ToErrorDetails());
		}

		TReturn? returnContent = await response.Content.ReadFromJsonAsync<TReturn>(cancellationToken);

		if (returnContent is null)
		{
			logger.LogError("Error deserializing type {type} from {url}: {statusCode} - {reasonPhrase}", typeof(TReturn).Name, url, response.StatusCode, response.ReasonPhrase);

			if (!noMessage && messageOnFail is not null)
				snackbar.NotifyFailure(messageOnFail);

			return Fail(ClientFailErrorDetails);
		}

		if (!noMessage && messageOnSuccess is not null)
			snackbar.NotifySuccess(messageOnSuccess);

		return returnContent;
	}

	public async Task<ApiResult> PutAsync(string url, string? messageOnSuccess = null, string? messageOnFail = null, bool noMessage = false, CancellationToken cancellationToken = default)
	{
		HttpResponseMessage response = await httpClient.PutAsync(url, null, cancellationToken);

		if (!response.IsSuccessStatusCode)
		{
			logger.LogError("Error sending data to {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);

			ProblemDetails? problemDetails = await ReadProblemDetailsAsync(response, cancellationToken);

			if (!noMessage)
				NotifyFailure(messageOnFail, problemDetails);

			if (problemDetails is not null)
				return Fail(problemDetails.ToErrorDetails());
		}

		if (!noMessage && messageOnSuccess is not null)
			snackbar.NotifySuccess(messageOnSuccess);

		return Ok();
	}

	public async Task<ApiResult<TReturn>> PutAsync<TReturn>(string url, string? messageOnSuccess = null, string? messageOnFail = null, bool noMessage = false, CancellationToken cancellationToken = default)
	{
		HttpResponseMessage response = await httpClient.PutAsync(url, null, cancellationToken);

		if (!response.IsSuccessStatusCode)
		{
			logger.LogError("Error sending data to {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);

			ProblemDetails? problemDetails = await ReadProblemDetailsAsync(response, cancellationToken);

			if (!noMessage)
				NotifyFailure(messageOnFail, problemDetails);

			if (problemDetails is not null)
				return Fail(problemDetails.ToErrorDetails());
		}

		TReturn? content = await response.Content.ReadFromJsonAsync<TReturn>(cancellationToken);

		if (content is null)
		{
			logger.LogError("Error deserializing type {type} from {url}: {statusCode} - {reasonPhrase}", typeof(TReturn).Name, url, response.StatusCode, response.ReasonPhrase);

			if (!noMessage && messageOnFail is not null)
				snackbar.NotifyFailure(messageOnFail);

			return Fail(ClientFailErrorDetails);
		}

		if (!noMessage && messageOnSuccess is not null)
			snackbar.NotifySuccess(messageOnSuccess);

		return content;
	}

	public async Task<ApiResult> PutAsync<T>(string url, T content, string? messageOnSuccess = null, string? messageOnFail = null, bool noMessage = false, CancellationToken cancellationToken = default)
	{
		HttpResponseMessage response = await httpClient.PutAsJsonAsync(url, content, cancellationToken);

		if (!response.IsSuccessStatusCode)
		{
			logger.LogError("Error sending data to {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);

			ProblemDetails? problemDetails = await ReadProblemDetailsAsync(response, cancellationToken);

			if (!noMessage)
				NotifyFailure(messageOnFail, problemDetails);

			if (problemDetails is not null)
				return Fail(problemDetails.ToErrorDetails());
		}

		if (!noMessage && messageOnSuccess is not null)
			snackbar.NotifySuccess(messageOnSuccess);

		return Ok();
	}

	public async Task<ApiResult<TReturn>> PutAsync<T, TReturn>(string url, T content, string? messageOnSuccess = null, string? messageOnFail = null, bool noMessage = false, CancellationToken cancellationToken = default)
	{
		HttpResponseMessage response = await httpClient.PutAsJsonAsync(url, content, cancellationToken);

		if (!response.IsSuccessStatusCode)
		{
			logger.LogError("Error sending data to {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);

			ProblemDetails? problemDetails = await ReadProblemDetailsAsync(response, cancellationToken);

			if (!noMessage)
				NotifyFailure(messageOnFail, problemDetails);

			if (problemDetails is not null)
				return Fail(problemDetails.ToErrorDetails());
		}

		TReturn? returnContent = await response.Content.ReadFromJsonAsync<TReturn>(cancellationToken);

		if (returnContent is null)
		{
			logger.LogError("Error deserializing type {type} from {url}: {statusCode} - {reasonPhrase}", typeof(TReturn).Name, url, response.StatusCode, response.ReasonPhrase);

			if (!noMessage && messageOnFail is not null)
				snackbar.NotifyFailure(messageOnFail);

			return Fail(ClientFailErrorDetails);
		}

		if (!noMessage && messageOnSuccess is not null)
			snackbar.NotifySuccess(messageOnSuccess);

		return returnContent;
	}

	public async Task<ApiResult> DeleteAsync(
		string url,
		string confirmItemLabel,
		string confirmItemValue,
		string confirmTitle = "Confirm Deletion",
		string? additionalMessage = null,
		bool needToConfirmValue = false,
		bool noMessage = false,
		CancellationToken cancellationToken = default)
	{
		bool confirmed = await dialogService.ShowConfirmDeleteDialogAsync(confirmTitle, confirmItemLabel, confirmItemValue, additionalMessage, needToConfirmValue);

		if (!confirmed)
			return Fail(CancelledByUserErrorDetails);

		return await DeleteAsync(url, noMessage, cancellationToken);
	}

	public async Task<ApiResult> DeleteAsync(string url, bool noMessage = false, CancellationToken cancellationToken = default)
	{
		HttpResponseMessage response = await httpClient.DeleteAsync(url, cancellationToken);

		if (!response.IsSuccessStatusCode)
		{
			logger.LogError("Error deleting data at {url}: {statusCode} - {reasonPhrase}", url, response.StatusCode, response.ReasonPhrase);
			snackbar.NotifyFailureDeleteEntry();

			ProblemDetails? problemDetails = await ReadProblemDetailsAsync(response, cancellationToken);

			if (!noMessage)
				NotifyFailure(SnackbarExtensions.DefaultMessageFailureDelete, problemDetails);

			if (problemDetails is not null)
				return Fail(problemDetails.ToErrorDetails());
		}

		if (!noMessage)
			snackbar.NotifySuccessDeleteEntry();

		return Ok();
	}

	private void NotifyFailure(string? messageOnFail, ProblemDetails? problemDetails)
	{
		MarkupString? message = problemDetails?.ToNotification() ?? messageOnFail?.ToMarkupString();

		if (message is null)
			return;

		snackbar.NotifyFailure(message.Value);
	}

	private async Task<ProblemDetails?> ReadProblemDetailsAsync(HttpResponseMessage response, CancellationToken cancellationToken)
	{
		if (response.Content.Headers.ContentType?.MediaType != "application/problem+json")
			return null;

		ProblemDetails problemDetails = await response.Content.ReadFromJsonAsync<ProblemDetails>(cancellationToken) ?? new ProblemDetails
		{
			Status = (int)response.StatusCode,
			Title = ClientFailErrorDetails.Title,
			Detail = "Failed to get error details",
			Type = ClientFailErrorDetails.Type
		};

		logger.LogError("Error details: [{problemType}] {problemDetail}", problemDetails.Type ?? problemDetails.Title, problemDetails.Detail);

		return problemDetails;
	}
}
