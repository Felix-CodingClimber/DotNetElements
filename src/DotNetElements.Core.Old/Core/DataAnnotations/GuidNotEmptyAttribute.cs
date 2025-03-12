namespace DotNetElements.Core.DataAnnotations;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter, AllowMultiple = false)]
public class GuidNotEmptyAttribute : ValidationAttribute
{
    public const string DefaultErrorMessage = "The {0} field must not be empty";

    private readonly bool allowNull;

    public GuidNotEmptyAttribute(bool allowNull = false) : base(DefaultErrorMessage)
    {
        this.allowNull = allowNull;
    }

    public override bool IsValid(object? value)
    {
        // NotEmpty doesn't necessarily mean required
        if (value is null)
            return allowNull;

        return value switch
        {
            Guid guid => guid != Guid.Empty,
            // Return not valid for all types except Guid
            _ => false,
        };
    }
}

