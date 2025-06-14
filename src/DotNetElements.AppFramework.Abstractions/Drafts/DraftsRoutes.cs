namespace DotNetElements.AppFramework.Abstractions.Drafts;

public static class DraftsRoutes
{
    public static string CreateOrUpdate(string draftsEndpoint) => draftsEndpoint;
    public static string Delete(string draftsEndpoint) => $"{draftsEndpoint}/{{id}}";
    public static string GetById(string draftsEndpoint) => $"{draftsEndpoint}/{{id}}";
    public static string GetDetails(string draftsEndpoint) => $"{draftsEndpoint}/{{id}}/details";

    public static string GetCreateOrUpdateUrl(string draftsEndpoint) => draftsEndpoint;
    public static string GetDeleteUrl(string draftsEndpoint, Guid id) => $"{draftsEndpoint}/{id}";
    public static string GetByIdUrl(string draftsEndpoint, Guid id) => $"{draftsEndpoint}/{id}";
    public static string GetDetailsUrl(string draftsEndpoint, Guid id) => $"{draftsEndpoint}/{id}/details";
}
