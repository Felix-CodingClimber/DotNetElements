using System.Text.RegularExpressions;

namespace DotNetElements.Core.Validation;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
public sealed class ValidRegularExpressionAttribute : ValidationAttribute
{
    public ValidRegularExpressionAttribute()
        : base("The field {0} must be a valid regular expression.")
    {
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        // Nulls are considered valid (use [Required] for null checks)
        if (value is null)
            return ValidationResult.Success;

        if (value is not string pattern)
            return new ValidationResult("The field must be a string.");

        try
        {
            _ = new Regex(pattern);
            return ValidationResult.Success;
        }
        catch (ArgumentException)
        {
            return new ValidationResult(
                FormatErrorMessage(validationContext.DisplayName)
                , validationContext.MemberName is not null ? [validationContext.MemberName] : null);
        }
    }
}