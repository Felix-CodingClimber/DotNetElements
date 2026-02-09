using System.Diagnostics.CodeAnalysis;

namespace DotNetElements.AppFramework.Abstractions.ResultObject;

/// <summary>
/// Structured error information transmitted from server to client.
/// Details are optional and should only be included when dynamic context is needed.
/// </summary>
public readonly record struct ErrorDetails
{
	public static string UnknownType => "UnknownError";
	public static string UnknownTitle => "Unknown Error";

	/// <summary>
	/// Machine-readable error code
	/// </summary>
	public required string Type { get; init; }

	/// <summary>
	/// Human-readable error title
	/// </summary>
	public required string Title { get; init; }

	/// <summary>
	/// Optional details
	/// </summary>
	public string? Details { get; init; }

	[SetsRequiredMembers]
	public ErrorDetails(string type, string title, string? details = null)
	{
		Type = type;
		Title = title;
		Details = details;
	}
}
