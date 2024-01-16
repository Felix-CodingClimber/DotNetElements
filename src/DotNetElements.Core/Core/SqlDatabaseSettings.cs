namespace DotNetElements.Core;

public abstract class SqlDatabaseSettings
{
    [Required]
    public required string SqlServerAddress { get; set; }

    [Required]
    public required string DatabaseName { get; set; }
}
