namespace DotNetElements.AppFramework.MudBlazorExtensions.Util;

public sealed record ProblemDetails
{
    public int? Status { get; init; }
    public string? Title { get; init; }
    public string? Detail { get; init; }
    public string? Type { get; init; }
}
