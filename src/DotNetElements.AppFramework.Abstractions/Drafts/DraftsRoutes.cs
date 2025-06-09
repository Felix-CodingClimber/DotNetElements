namespace DotNetElements.AppFramework.Abstractions.Drafts;

public static class DraftsRoutes
{
    public static string BaseUrl(string draftsEndpoint) => $"{draftsEndpoint}/drafts";
    public static string CreateOrUpdate(string draftsEndpoint) => BaseUrl(draftsEndpoint);
    public static string Delete(string draftsEndpoint) => $"{BaseUrl(draftsEndpoint)}/{{id}}";
    public static string GetById(string draftsEndpoint) => $"{BaseUrl(draftsEndpoint)}/{{id}}";
    public static string GetDetails(string draftsEndpoint) => $"{BaseUrl(draftsEndpoint)}/{{id}}/details";

    public static string GetCreateOrUpdateUrl(string draftsEndpoint) => BaseUrl(draftsEndpoint);
    public static string GetDeleteUrl(string draftsEndpoint, Guid id) => $"{BaseUrl(draftsEndpoint)}/{id}";
    public static string GetByIdUrl(string draftsEndpoint, Guid id) => $"{BaseUrl(draftsEndpoint)}/{id}";
    public static string GetDetailsUrl(string draftsEndpoint, Guid id) => $"{BaseUrl(draftsEndpoint)}/{id}/details";
}
