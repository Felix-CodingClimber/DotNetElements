namespace DotNetElements.AppFramework.Abstractions.Outbox;

public sealed class OutboxMessage
{
    public Guid Id { get; init; }

    public required string Type { get; init; }

    public required string Content { get; init; }

    public required DateTimeOffset OccurredOnUtc { get; init; }

    public DateTimeOffset? ProcessedOnUtc { get; set; }

    public string? Error { get; set; }

    public int RetryCount { get; set; }
}
