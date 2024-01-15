using Microsoft.Extensions.Time.Testing;

namespace DotNetElements.Core.Test.Utils;

internal class FakeRepository<TDbContext, TEntity, TKey> : Repository<TDbContext, TEntity, TKey>, IDisposable
	where TDbContext : DbContext
	where TEntity : Entity<TKey>
	where TKey : notnull
{
	public FakeRepository(TDbContext dbContext) : base(
		dbContext,
		new FakeCurrentUserProvider(),
		new FakeTimeProvider())
	{
	}

	public FakeRepository(TDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider) : base(
		dbContext,
		currentUserProvider,
		timeProvider)
	{
	}

	public void Dispose()
	{
		DbContext.Dispose();
	}
}
