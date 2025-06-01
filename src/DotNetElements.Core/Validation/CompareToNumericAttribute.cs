using System.Reflection;

namespace DotNetElements.Core.Validation;

public enum NumericComparisonType
{
    Equal,
    NotEqual,
    GreaterThan,
    GreaterThanOrEqual,
    LessThan,
    LessThanOrEqual
}

[AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
public sealed class CompareToNumericAttribute : ValidationAttribute
{
    public string OtherProperty { get; }
    public NumericComparisonType ComparisonType { get; }

    public CompareToNumericAttribute(string otherProperty, NumericComparisonType comparisonType)
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

        // Ensure both values are of the same type or compatible types
        if (value.GetType() != otherValue.GetType())
            throw new Exception("Compared properties must be of the same type.");

        if (value is not IComparable valueComp || otherValue is not IComparable otherComp)
            throw new Exception($"The {nameof(CompareToNumericAttribute)} can only be applied to properties that implement {nameof(IComparable)}.");

        int comparison = valueComp.CompareTo(otherComp);

        bool isValid = ComparisonType switch
        {
            NumericComparisonType.Equal => comparison == 0,
            NumericComparisonType.NotEqual => comparison != 0,
            NumericComparisonType.GreaterThan => comparison > 0,
            NumericComparisonType.GreaterThanOrEqual => comparison >= 0,
            NumericComparisonType.LessThan => comparison < 0,
            NumericComparisonType.LessThanOrEqual => comparison <= 0,
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
