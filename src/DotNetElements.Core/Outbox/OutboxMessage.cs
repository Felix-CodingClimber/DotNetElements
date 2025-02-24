namespace DotNetElements.Core;

public sealed class OutboxMessage
{
    public Guid Id { get; init; }

    [SQLStringColumn(Length = 255)]
    public required string Type { get; init; }

    [SQLStringColumn]
    public required string Content { get; init; }

    public required DateTimeOffset OccurredOnUtc { get; init; }

    public DateTimeOffset? ProcessedOnUtc { get; set; }

    [SQLStringColumn]
    public string? Error { get; set; }

    [SQLTinyIntColumn]
    public int RetryCount { get; set; }
}
