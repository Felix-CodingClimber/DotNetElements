namespace BlazorCrud.Core;

public abstract class SqlContextBase : DbContext
{
	private readonly string connectionString;

	public SqlContextBase(SqLiteDatabaseSettings settings)
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