using Microsoft.AspNetCore.Components;

namespace DotNetElements.AppFramework.MudBlazorExtensions.Extensions;

public static class StringExtensions
{
	public const string Placeholder = "---";

	public static string PlaceholderIfNull(this string? value)
	{
		return string.IsNullOrEmpty(value) ? Placeholder : value;
	}

	public static MarkupString? ToMarkupString(this string? value)
	{
		if (value is null)
			return null;

		return new MarkupString(value);
	}
}
