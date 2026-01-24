using System.ComponentModel;
using System.Globalization;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace DotNetElements.Core;

public static partial class ReadableTimeSpan
{
    private static bool configurationBindingIsEnabled;

    /// <summary>
    /// Enables configuration binding by registering a custom type converter for TimeSpan values.
    /// </summary>
    public static void EnableConfigurationBinding()
    {
        if (configurationBindingIsEnabled)
            return;

        configurationBindingIsEnabled = true;
        TypeDescriptor.AddAttributes(typeof(TimeSpan), new TypeConverterAttribute(typeof(ReadableTimeSpanConverter)));
    }

    public static TimeSpan Parse(string stringTimespan)
    {
        if (string.IsNullOrWhiteSpace(stringTimespan))
        {
            throw new ArgumentNullException(nameof(stringTimespan));
        }

        if (TimeSpan.TryParse(stringTimespan, out var timeSpan))
        {
            return timeSpan;
        }

        if (stringTimespan.Trim() == "0")
        {
            return TimeSpan.Zero;
        }

        timeSpan = TimeSpan.Zero;

        foreach (var segment in stringTimespan.ToLower(CultureInfo.InvariantCulture).Split(':', StringSplitOptions.RemoveEmptyEntries))
        {
            var (amount, unit) = ExtractUnitAndAmount(segment);
            timeSpan += ReadableTimeSpanUnitHelper.Map(unit).Invoke(amount);
        }

        return timeSpan;
    }

    public static bool TryParse(string stringTimespan, out TimeSpan readableTimeSpan)
    {
        try
        {
            readableTimeSpan = Parse(stringTimespan);
            return true;
        }
        catch
        {
            readableTimeSpan = default;
            return false;
        }
    }

    public static string ToReadableString(this TimeSpan timeSpan)
    {
        StringBuilder stringBuilder = new();

        if (timeSpan.Days > 1)
        {
            stringBuilder.Append($"{timeSpan.Days} Days, ");
        }
        else if (timeSpan.Days > 0)
        {
            stringBuilder.Append("1 Day, ");
        }

        if (timeSpan.Hours > 1)
        {
            stringBuilder.Append($"{timeSpan.Hours} Hours, ");
        }
        else if (timeSpan.Hours > 0)
        {
            stringBuilder.Append("1 Hour, ");
        }

        if (timeSpan.Minutes > 1)
        {
            stringBuilder.Append($"{timeSpan.Minutes} Minutes, ");
        }
        else if (timeSpan.Minutes > 0)
        {
            stringBuilder.Append("1 Minute, ");
        }

        if (timeSpan.Seconds > 1)
        {
            stringBuilder.Append($"{timeSpan.Seconds} Seconds, ");
        }
        else if (timeSpan.Seconds > 0)
        {
            stringBuilder.Append("1 Second, ");
        }

        if (timeSpan.Milliseconds > 1)
        {
            stringBuilder.Append($"{timeSpan.Milliseconds} Milliseconds, ");
        }
        else if (timeSpan.Milliseconds > 0)
        {
            stringBuilder.Append("1 Millisecond");
        }

        return stringBuilder
            .ToString()
            .TrimEnd(", ")
            .ReplaceLastOccurrence(", ", " and ");
    }

    private static (double amount, ReadableTimeSpanUnit unit) ExtractUnitAndAmount(string stringTimespan)
    {
        var regexResult = AlphaAndNumberRegex().Match(stringTimespan);

        if (regexResult.Groups.Count != 3) // The entire string itself counts as the first group.
        {
            throw new ArgumentException($"{stringTimespan} is not valid TimeSpan. Expected an amount and unit in each section.", nameof(stringTimespan));
        }

        var stringUnit = regexResult.Groups[2].Value;

        if (!Enum.TryParse(stringUnit, true, out ReadableTimeSpanUnit readableTimeSpanUnit))
        {
            throw new ArgumentException($"{stringUnit} is not a valid TimeSpan unit", nameof(ReadableTimeSpanUnit));
        }

        return (double.Parse(regexResult.Groups[1].Value), readableTimeSpanUnit);
    }

    [GeneratedRegex(@"(\d+\.?\d*)\s*([a-zA-Z]+)")]
    private static partial Regex AlphaAndNumberRegex();
}

internal enum ReadableTimeSpanUnit
{
    Ms,
    Millisecond,
    Milliseconds,

    S,
    Second,
    Seconds,

    Min,
    Mins,
    Minute,
    Minutes,

    H,
    Hour,
    Hours,

    D,
    Day,
    Days
}

internal static class ReadableTimeSpanUnitHelper
{
    internal static Func<double, TimeSpan> Map(ReadableTimeSpanUnit readableTimeSpanUnit)
    {
        return readableTimeSpanUnit switch
        {
            ReadableTimeSpanUnit.Ms or ReadableTimeSpanUnit.Millisecond or ReadableTimeSpanUnit.Milliseconds => TimeSpan.FromMilliseconds,
            ReadableTimeSpanUnit.S or ReadableTimeSpanUnit.Second or ReadableTimeSpanUnit.Seconds => TimeSpan.FromSeconds,
            ReadableTimeSpanUnit.Min or ReadableTimeSpanUnit.Mins or ReadableTimeSpanUnit.Minute or ReadableTimeSpanUnit.Minutes => TimeSpan.FromMinutes,
            ReadableTimeSpanUnit.H or ReadableTimeSpanUnit.Hour or ReadableTimeSpanUnit.Hours => TimeSpan.FromHours,
            ReadableTimeSpanUnit.D or ReadableTimeSpanUnit.Day or ReadableTimeSpanUnit.Days => TimeSpan.FromDays,
            _ => throw new ArgumentOutOfRangeException(nameof(readableTimeSpanUnit), readableTimeSpanUnit, null),
        };
    }
}

public sealed class ReadableTimeSpanConverter : TypeConverter
{
    public override bool CanConvertFrom(ITypeDescriptorContext? context, Type sourceType)
    {
        return sourceType == typeof(string) || base.CanConvertFrom(context, sourceType);
    }

    public override object? ConvertFrom(ITypeDescriptorContext? context, CultureInfo? culture, object value)
    {
        if (value is string stringValue)
        {
            return ReadableTimeSpan.Parse(stringValue);
        }

        return base.ConvertFrom(context, culture, value);
    }

    public override bool CanConvertTo(ITypeDescriptorContext? context, Type? destinationType)
    {
        return destinationType == typeof(string[]) || base.CanConvertTo(context, destinationType);
    }

    public override object? ConvertTo(ITypeDescriptorContext? context, CultureInfo? culture, object? value, Type destinationType)
    {
        if (destinationType == typeof(string))
        {
            return value?.ToString();
        }

        return base.ConvertTo(context, culture, value, destinationType);
    }
}

public sealed class ReadableTimeSpanJsonConverter : JsonConverter<TimeSpan>
{
    public override TimeSpan Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var value = reader.GetString();

        if (string.IsNullOrEmpty(value))
        {
            return TimeSpan.Zero;
        }

        return ReadableTimeSpan.Parse(value!);
    }

    public override void Write(Utf8JsonWriter writer, TimeSpan value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString());
    }
}

file static class StringExtensions
{
    internal static string TrimEnd(this string source, string value)
    {
        return source.EndsWith(value)
            ? source.Remove(source.LastIndexOf(value, StringComparison.Ordinal))
            : source;
    }

    internal static string ReplaceLastOccurrence(this string source, string find, string replace)
    {
        int index = source.LastIndexOf(find, StringComparison.Ordinal);

        if (index == -1)
            return source;

        return source.Remove(index, find.Length).Insert(index, replace);
    }
}
