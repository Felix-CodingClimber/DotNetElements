namespace DotNetElements.Core.Validation;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
public sealed class ValidateObjectAttribute : ValidationAttribute
{
	public ValidateObjectAttribute()
		: base("Nested item is not valid.")
	{
	}

	protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
	{
		if (value is null)
			return ValidationResult.Success;

		ValidationContext context = new(value, validationContext, null);
		List<ValidationResult> results = [];

		if (!Validator.TryValidateObject(value, context, results, validateAllProperties: true))
			return new ValidationResult(ErrorMessage, validationContext.MemberName is not null ? [validationContext.MemberName] : null);

		return ValidationResult.Success;
	}
}
