namespace DotNetElements.Core;

public static class DateTimeExtensions
{
    private const string Placeholder = "---";

    public static string ToFriendlyDateTime(this DateTime dateTime)
    {
        return dateTime.ToString("g");
    }

    public static string ToFriendlyShortMonthDay(this DateTime dateTime)
    {
        return dateTime.ToString("MMM dd");
    }

    public static string ToFriendlyDateTime(this DateTime? dateTime)
    {
        return dateTime?.ToString("g") ?? Placeholder;
    }

    public static string ToFriendlyShortMonthDay(this DateTime? dateTime)
    {
        return dateTime?.ToString("MMM dd") ?? Placeholder;
    }
}
