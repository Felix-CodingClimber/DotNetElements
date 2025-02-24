using System.Reflection;

namespace DotNetElements.Core;

public sealed class JobInterval
{
    public static JobInterval FromSeconds(int seconds) => new JobInterval { Value = seconds, Unit = IntervalUnit.Seconds };
    public static JobInterval FromMinutes(int minutes) => new JobInterval { Value = minutes, Unit = IntervalUnit.Minutes };

    [Range(1, 59, ErrorMessage = "Interval needs to be between {0} and {1}")]
    public int Value { get; private init; }

    [Required]
    public IntervalUnit Unit { get; private init; }

    private JobInterval() { }
}

public enum IntervalUnit
{
    Seconds,
    Minutes
}

public sealed class OutboxOptions : IValidatableObject
{
    [Required]
    public Assembly? MessagesAssembly { get; set; }

    [Range(minimum: 1, maximum: 10)]
    public int MaxRetryCount { get; set; } = 3;

    [Required]
    public JobInterval JobInterval { get; set; } = JobInterval.FromSeconds(30);

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        List<ValidationResult> results = [];
        Validator.TryValidateObject(JobInterval, new ValidationContext(JobInterval), results, true);

        return results;
    }
}
