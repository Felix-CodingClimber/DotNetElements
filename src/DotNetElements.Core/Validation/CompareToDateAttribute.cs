using System.Reflection;

namespace DotNetElements.Core.Validation;

public enum DateComparisonType
{
    Equal,
    NotEqual,
    GreaterThan,
    GreaterThanOrEqual,
    LessThan,
    LessThanOrEqual
}

[AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
public sealed class CompareToDateAttribute : ValidationAttribute
{
    public string OtherProperty { get; private init; }
    public DateComparisonType ComparisonType { get; private init; }

    public CompareToDateAttribute(string otherProperty, DateComparisonType comparisonType)
    {
        OtherProperty = otherProperty;
        ComparisonType = comparisonType;
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        PropertyInfo otherPropertyInfo = validationContext.ObjectType.GetProperty(OtherProperty, BindingFlags.Public | BindingFlags.Instance)
            ?? throw new Exception($"Unknown property: {OtherProperty}");

        object? otherValue = otherPropertyInfo.GetValue(validationContext.ObjectInstance);

        // Nulls are considered valid (use [Required] for null checks)
        if (value is null || otherValue is null)
            return ValidationResult.Success;

        // Normalize both values to DateTime for comparison
        DateTime? thisDate = value switch
        {
            DateTime dt => dt,
            DateTimeOffset dto => dto.UtcDateTime,
            _ => null
        };

        DateTime? otherDate = otherValue switch
        {
            DateTime dt => dt,
            DateTimeOffset dto => dto.UtcDateTime,
            _ => null
        };

        if (thisDate is null || otherDate is null)
            throw new Exception($"The {nameof(CompareToDateAttribute)} can only be applied to properties of type {nameof(DateTime)} or {nameof(DateTimeOffset)}.");

        int comparison = DateTime.Compare(thisDate.Value, otherDate.Value);

        bool isValid = ComparisonType switch
        {
            DateComparisonType.Equal => comparison == 0,
            DateComparisonType.NotEqual => comparison != 0,
            DateComparisonType.GreaterThan => comparison > 0,
            DateComparisonType.GreaterThanOrEqual => comparison >= 0,
            DateComparisonType.LessThan => comparison < 0,
            DateComparisonType.LessThanOrEqual => comparison <= 0,
            _ => throw new NotImplementedException(nameof(ComparisonType))
        };

        if (isValid)
            return ValidationResult.Success;

        return new ValidationResult(
            FormatErrorMessage(validationContext.DisplayName),
            validationContext.MemberName is not null ? [validationContext.MemberName] : null);
    }

    public override string FormatErrorMessage(string name) => ErrorMessage ?? $"{name} must be {ComparisonType} {OtherProperty}.";
}