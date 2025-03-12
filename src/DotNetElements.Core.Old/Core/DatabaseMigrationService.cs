namespace DotNetElements.Core;

public class DatabaseMigrationService<TDbContext> : IDatabaseMigrationService<TDbContext>
	where TDbContext : DbContext
{
	private readonly TDbContext dbContext;

	public DatabaseMigrationService(TDbContext dbContext)
	{
		this.dbContext = dbContext;
	}

	public bool EnsureCreated()
	{
		return dbContext.Database.EnsureCreated();
	}

	public async Task<bool> EnsureCreatedAsync()
	{
		return await dbContext.Database.EnsureCreatedAsync();
	}

	public void Migrate()
	{
		dbContext.Database.Migrate();
	}

	public async Task MigrateAsync(CancellationToken cancellationToken)
	{
		await dbContext.Database.MigrateAsync(cancellationToken);
	}
}
