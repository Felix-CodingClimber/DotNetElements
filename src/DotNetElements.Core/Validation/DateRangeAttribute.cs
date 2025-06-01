using System.Globalization;

namespace DotNetElements.Core.Validation;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
public sealed class DateRangeAttribute : ValidationAttribute
{
    public DateTime? Minimum { get; }
    public DateTime? Maximum { get; }

    public DateRangeAttribute(string? minimum = null, string? maximum = null, string format = "yyyy-MM-dd")
    {
        if (!string.IsNullOrWhiteSpace(minimum))
            Minimum = DateTime.ParseExact(minimum, format, CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal);

        if (!string.IsNullOrWhiteSpace(maximum))
            Maximum = DateTime.ParseExact(maximum, format, CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal);
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is null)
            return ValidationResult.Success;

        DateTime date;

        if (value is DateTime dt)
            date = dt;
        else if (value is DateTimeOffset dto)
            date = dto.UtcDateTime;
        else
            throw new Exception($"The {nameof(DateRangeAttribute)} can only be applied to properties of type {nameof(DateTime)} or {nameof(DateTimeOffset)}.");

        if (Minimum is not null && date < Minimum.Value)
            return new ValidationResult(
                ErrorMessage ?? $"Date must be on or after {Minimum.Value:yyyy-MM-dd}."
                , validationContext.MemberName is not null ? [validationContext.MemberName] : null);

        if (Maximum is not null && date > Maximum.Value)
            return new ValidationResult(
                ErrorMessage ?? $"Date must be on or before {Maximum.Value:yyyy-MM-dd}."
                , validationContext.MemberName is not null ? [validationContext.MemberName] : null);

        return ValidationResult.Success;
    }
}
