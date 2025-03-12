namespace DotNetElements.Core;

public abstract class SqlContextBase : DbContext
{
    private readonly string connectionString;

    public SqlContextBase(SqlDatabaseSettings settings, string user, string password)
    {
        connectionString = SqlConnectionHelper.GetConnectionString(settings.SqlServerAddress, settings.DatabaseName, user, password, false);
    }

    public SqlContextBase(SqlDatabaseSettings settings)
    {
        connectionString = SqlConnectionHelper.GetConnectionString(settings.SqlServerAddress, settings.DatabaseName, null, null, true);
    }

    public SqlContextBase(string sqlServerAddress, string databaseName)
    {
        connectionString = SqlConnectionHelper.GetConnectionString(sqlServerAddress, databaseName, null, null, true);
    }

    public SqlContextBase(string sqlServerAddress, string databaseName, string user, string password)
    {
        connectionString = SqlConnectionHelper.GetConnectionString(sqlServerAddress, databaseName, user, password, false);
    }

    public bool IsDatabaseAvailable()
    {
        return Database.CanConnect();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (optionsBuilder.IsConfigured)
            return;

        optionsBuilder.UseSqlServer(connectionString);
    }
}