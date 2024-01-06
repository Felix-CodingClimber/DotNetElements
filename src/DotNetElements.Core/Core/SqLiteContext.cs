namespace DotNetElements.Core;

public abstract class SqLiteContext : DbContext
{
	private readonly string connectionString;

	public SqLiteContext(SqLiteDatabaseSettings settings)
	{
		connectionString = $"Data Source={settings.FilePath}";
	}

	public bool IsDatabaseAvailable()
	{
		return Database.CanConnect();
	}

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
		if (optionsBuilder.IsConfigured)
			return;

		optionsBuilder.UseSqlite(connectionString);
	}
}