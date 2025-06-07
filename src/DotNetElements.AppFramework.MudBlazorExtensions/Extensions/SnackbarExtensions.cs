namespace DotNetElements.AppFramework.MudBlazorExtensions.Extensions;

public static class SnackbarExtensions
{
    public const string DefaultMessageSuccessCreate = "Entry created successfully";
    public const string DefaultMessageSuccessUpdate = "Entry updated successfully";
    public const string DefaultMessageSuccessDelete = "Entry deleted successfully";
    public const string DefaultMessageFailureCreate = "Failed to create entry";
    public const string DefaultMessageFailureUpdate = "Failed to update entry";
    public const string DefaultMessageFailureDelete = "Failed to delete entry";
    public const string DefaultMessageFailureFetch = "Failed to fetch data from server";

    public static void NotifyFailureCreateEntry(this ISnackbar snackbar)
    {
        snackbar.NotifyFailure(DefaultMessageFailureCreate);
    }

    public static void NotifyFailureUpdateEntry(this ISnackbar snackbar)
    {
        snackbar.NotifyFailure(DefaultMessageFailureUpdate);
    }

    public static void NotifyFailureDeleteEntry(this ISnackbar snackbar)
    {
        snackbar.NotifyFailure(DefaultMessageFailureDelete);
    }

    public static void NotifyFailureFetchData(this ISnackbar snackbar)
    {
        snackbar.NotifyFailure(DefaultMessageFailureFetch);
    }

    public static void NotifyMissingQueryParameter(this ISnackbar snackbar, params Span<string?> parameterNames)
    {
        snackbar.NotifyFailure($"Missing query parameters: {string.Join(", ", parameterNames)}");
    }

    public static void NotifySuccessCreateEntry(this ISnackbar snackbar)
    {
        snackbar.NotifySuccess(DefaultMessageSuccessCreate);
    }

    public static void NotifySuccessUpdateEntry(this ISnackbar snackbar)
    {
        snackbar.NotifySuccess(DefaultMessageSuccessUpdate);
    }

    public static void NotifySuccessDeleteEntry(this ISnackbar snackbar)
    {
        snackbar.NotifySuccess(DefaultMessageSuccessDelete);
    }

    public static void NotifyFailure(this ISnackbar snackbar, string message)
    {
        snackbar.Add(message, Severity.Error);
    }

    public static void NotifySuccess(this ISnackbar snackbar, string message)
    {
        snackbar.Add(message, Severity.Success);
    }
}
