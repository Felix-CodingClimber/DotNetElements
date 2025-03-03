using System.Data.Common;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Time.Testing;

namespace DotNetElements.Core.EntityFramework.Example;

internal sealed class FakeModuleServiceFactory<TDbContext> : IDisposable
    where TDbContext : DbContext, IFakeDbContext
{
    public readonly FakeCurrentUserProvider UserProvider = new();
    public readonly TimeProvider TimeProvider = TimeProvider.System;

    private DbConnection? connection;

    private DbContextOptions CreateOptions()
    {
        ArgumentNullException.ThrowIfNull(connection);

        return new DbContextOptionsBuilder()
            .UseSqlite(connection)
            .AddInterceptors(
                new AuditInterceptor(TimeProvider, UserProvider))
            .Options;
    }

    public FakeModuleService<TDbContext, TModuleService> CreateModule<TModuleService>(string? logContext = null)
        where TModuleService : ModuleService<TDbContext>
    {
        if (connection is null)
        {
            connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            using TDbContext context = (TDbContext)Activator.CreateInstance(typeof(TDbContext), CreateOptions())!;

            context.Database.EnsureCreated();
        }

        TDbContext dbContext = (TDbContext)Activator.CreateInstance(typeof(TDbContext), CreateOptions())!;

        return FakeModuleService<TDbContext, TModuleService>.Create(dbContext, logContext);
    }

    public void Dispose()
    {
        if (connection is not null)
        {
            connection.Dispose();
            connection = null;
        }

        Console.ForegroundColor = ConsoleColor.White;
    }
}
