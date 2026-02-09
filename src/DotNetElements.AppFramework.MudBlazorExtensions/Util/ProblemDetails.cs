using Microsoft.AspNetCore.Components;

namespace DotNetElements.AppFramework.MudBlazorExtensions.Util;

public sealed record ProblemDetails
{
	public int? Status { get; init; }
	public string? Title { get; init; }
	public string? Detail { get; init; }
	public string? Type { get; init; }

	public ErrorDetails ToErrorDetails()
	{
		return new ErrorDetails()
		{
			Type = Type ?? ErrorDetails.UnknownType,
			Title = Title ?? ErrorDetails.UnknownTitle,
			Details = Detail
		};
	}

	public MarkupString? ToNotification()
	{
		if (Detail is not null)
			return new MarkupString($"<b>{Title}</b><br/>{Detail}");
		else if (Title is not null)
			return new MarkupString(Title);

		return null;
	}
}
