namespace DotNetElements.Core;

// todo improve
public static class SimpleUrlQueryBuilder
{
	public static string Build(string basePath, Dictionary<string, string> queryParams)
	{
		string queryString = string.Join("&",
			queryParams.Select(kvp => $"{Uri.EscapeDataString(kvp.Key)}={Uri.EscapeDataString(kvp.Value)}"));

		if (queryParams.Count > 0)
			return $"{basePath}?{queryString}";
		else
			return basePath;
	}
}
