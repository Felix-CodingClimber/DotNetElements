namespace DotNetElements.Core.Validation;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
public sealed class ValidateItemsAttribute : ValidationAttribute
{
    public ValidateItemsAttribute()
        : base("One or more items are not valid.")
    {
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is null)
            return ValidationResult.Success;

        if (value is not IEnumerable enumerable)
            throw new Exception($"The {nameof(ValidateItemsAttribute)} can only be applied to properties of type {nameof(IEnumerable)}.");

        foreach (object item in enumerable)
        {
            ValidationContext context = new(item, validationContext, null);
            List<ValidationResult> results = [];

            if (!Validator.TryValidateObject(item, context, results, validateAllProperties: true))
                return new ValidationResult(ErrorMessage, validationContext.MemberName is not null ? [validationContext.MemberName] : null);
        }

        return ValidationResult.Success;
    }
}
