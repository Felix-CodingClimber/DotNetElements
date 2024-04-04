namespace DotNetElements.Core;

public static class DateTimeOffsetExtensions
{
    private const string Placeholder = "---";

    public static string ToFriendlyDateTime(this DateTimeOffset dateTimeOffset)
    {
        return dateTimeOffset.DateTime.ToFriendlyDateTime();
    }

    public static string ToFriendlyLocalDateTime(this DateTimeOffset dateTimeOffset)
    {
        return dateTimeOffset.LocalDateTime.ToFriendlyDateTime();
    }

    public static string ToFriendlyDateTime(this DateTimeOffset? dateTimeOffset)
    {
        return dateTimeOffset?.DateTime.ToFriendlyDateTime() ?? Placeholder;
    }

    public static string ToFriendlyLocalDateTime(this DateTimeOffset? dateTimeOffset)
    {
        return dateTimeOffset?.LocalDateTime.ToFriendlyDateTime() ?? Placeholder;
    }
}
