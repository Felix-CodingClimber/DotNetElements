namespace DotNetElements.Core;

/// <summary>
/// Provides simplified methods to validate objects using data annotations.
/// </summary>
public static class MiniValidator
{
    /// <summary>
    /// Tries to validate the specified instance and returns a value that indicates whether the validation succeeded.
    /// </summary>
    /// <typeparam name="T">The type of the instance to validate.</typeparam>
    /// <param name="instance">The instance to validate.</param>
    /// <param name="validationResults">A collection to hold the validation results.</param>
    /// <returns><c>true</c> if the instance is valid; otherwise, <c>false</c>.</returns>
    /// <exception cref="ArgumentNullException">Thrown when the instance is null.</exception>
    public static bool TryValidate<T>(T instance, out List<ValidationResult> validationsResults)
    {
        ArgumentNullException.ThrowIfNull(instance);

        ValidationContext context = new ValidationContext(instance, null, null);
        validationsResults = [];

        return Validator.TryValidateObject(instance, context, validationsResults, true);
    }

    /// <summary>
    /// Throws an <see cref="ArgumentException"/> if the specified instance is not valid.
    /// </summary>
    /// <typeparam name="T">The type of the instance to validate.</typeparam>
    /// <param name="instance">The instance to validate.</param>
    /// <exception cref="ArgumentException"></exception>
    public static void ThrowIfNotValid<T>(T instance)
    {
        if (!TryValidate(instance, out List<ValidationResult> validationResults))
        {
            string errorMessage = string.Join(", ", validationResults.Select(result => $"{result.MemberNames.First()}: {result.ErrorMessage}"));
            throw new ArgumentException($"Invalid {typeof(T).Name} Error: {errorMessage}");
        }
    }
}