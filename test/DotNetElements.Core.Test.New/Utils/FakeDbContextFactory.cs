using System.Data.Common;
using DotNetElements.Core.Crud;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Time.Testing;

namespace DotNetElements.Core.Test.Utils;

internal sealed class FakeDbContextFactory<TDbContext> : IDisposable
	where TDbContext : DbContext
{
    public readonly FakeCurrentUserProvider UserProvider = new();
    public readonly FakeTimeProvider TimeProvider = new();

    private DbConnection? connection;

	private DbContextOptions CreateOptions()
	{
		ArgumentNullException.ThrowIfNull(connection);

		return new DbContextOptionsBuilder()
			.UseSqlite(connection)
			.AddInterceptors(new SoftDeleteInterceptor(TimeProvider, UserProvider))
			.Options;
	}

	public TDbContext CreateContext()
	{
		if (connection is null)
		{
			connection = new SqliteConnection("DataSource=:memory:");
			connection.Open();

			using TDbContext context = (TDbContext)Activator.CreateInstance(typeof(TDbContext), CreateOptions())!;

			context.Database.EnsureCreated();
		}

		return (TDbContext)Activator.CreateInstance(typeof(TDbContext), CreateOptions())!;
	}

	public void Dispose()
	{
		if (connection is not null)
		{
			connection.Dispose();
			connection = null;
		}
	}
}
