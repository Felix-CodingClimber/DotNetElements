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

    public static string ToFriendlyDateDiff(this DateTimeOffset dateTimeOffset, DateTime now)
    {
        TimeSpan timeSpan = new DateTimeOffset(now).Subtract(dateTimeOffset);

        if (timeSpan.TotalMinutes < 1)
            return "just now";
        if (timeSpan.TotalMinutes < 2)
            return "a minute ago";
        if (timeSpan.TotalHours < 1)
            return $"{timeSpan.Minutes} minutes ago";
        if (timeSpan.TotalHours < 2)
            return "an hour ago";
        if (timeSpan.TotalDays < 1)
            return $"{timeSpan.Hours} hours ago";
        if (timeSpan.TotalDays < 2)
            return "yesterday";
        if (timeSpan.TotalDays < 30)
            return $"{timeSpan.Days} days ago";
        if (timeSpan.TotalDays < 60)
            return "a month ago";
        if (timeSpan.TotalDays < 365)
            return $"{Math.Round(timeSpan.TotalDays / 30)} months ago";
        if (timeSpan.TotalDays < 730)
            return "last year";

        // Handle dates more than 2 years ago
        return string.Format("{0} years ago", Math.Round(timeSpan.TotalDays / 365));
    }
}
