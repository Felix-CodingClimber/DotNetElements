namespace DotNetElements.Core.DataAnnotations;

public class EnumRequiredNotDefaultAttribute<TEnum> : ValidationAttribute
    where TEnum : struct, Enum
{
    private readonly TEnum defaultValue;

    public EnumRequiredNotDefaultAttribute(TEnum defaultValue)
    {
        this.defaultValue = defaultValue;
    }

    protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
    {
        if (value is null)
            return new ValidationResult("The field is required");

        if (value is not TEnum enumValue || !Enum.IsDefined<TEnum>(enumValue))
            return new ValidationResult("Invalid value");

        if (enumValue.Equals(defaultValue))
            return new ValidationResult($"The field is required (value can not be {defaultValue})");

        return ValidationResult.Success!;
    }
}
