using System.Data.Common;
using Microsoft.Data.Sqlite;

namespace DotNetElements.Core.Test.Utils;

public sealed class FakeDbContextFactory<TDbContext> : IDisposable
	where TDbContext : DbContext
{
	private DbConnection? connection;

	private DbContextOptions CreateOptions()
	{
		ArgumentNullException.ThrowIfNull(connection);

		return new DbContextOptionsBuilder()
			.UseSqlite(connection).Options;
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
