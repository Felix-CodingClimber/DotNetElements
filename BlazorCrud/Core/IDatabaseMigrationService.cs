namespace BlazorCrud.Core;

public interface IDatabaseMigrationService<TDbContext>
	where TDbContext : DbContext
{
	bool EnsureCreated();
	Task<bool> EnsureCreatedAsync();
	void Migrate();
	Task MigrateAsync(CancellationToken cancellationToken = default);
}