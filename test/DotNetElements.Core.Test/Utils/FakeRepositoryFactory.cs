using Microsoft.Extensions.Time.Testing;

namespace DotNetElements.Core.Test.Utils;

internal sealed class FakeRepositoryFactory<TDbContext, TRepository, TEntity, TKey> : IDisposable
	where TDbContext : DbContext
	where TRepository : FakeRepository<TDbContext, TEntity, TKey>
	where TEntity : Entity<TKey>
	where TKey : notnull
{
	public readonly FakeCurrentUserProvider UserProvider = new();
	public readonly FakeTimeProvider TimeProvider = new();

	private readonly FakeDbContextFactory<TDbContext> dbContextFactory = new();

	public TRepository CreateRepository()
	{
		return (TRepository)Activator.CreateInstance(typeof(TRepository),
			dbContextFactory.CreateContext(),
			UserProvider,
			TimeProvider)!;
	}

	public void Dispose()
	{
		dbContextFactory.Dispose();
	}
}
