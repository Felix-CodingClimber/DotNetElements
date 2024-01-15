namespace DotNetElements.Core.Test.Utils;

internal sealed class FakeRepositoryFactory<TDbContext, TRepository, TEntity, TKey> : IDisposable
	where TDbContext : DbContext
	where TRepository : FakeRepository<TDbContext, TEntity, TKey>
	where TEntity : Entity<TKey>
	where TKey : notnull
{
	private readonly FakeDbContextFactory<TDbContext> dbContextFactory = new();

	public TRepository CreateRepository()
	{
		return (TRepository)Activator.CreateInstance(typeof(TRepository), dbContextFactory.CreateContext())!;
	}

	public void Dispose()
	{
		dbContextFactory.Dispose();
	}
}
