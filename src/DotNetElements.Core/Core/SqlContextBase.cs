using Microsoft.Data.SqlClient;

namespace DotNetElements.Core;

public abstract class SqlContextBase : DbContext
{
    private readonly string connectionString;

    public SqlContextBase(SqlDatabaseSettings settings, string user, string password)
    {
        connectionString = GetConnectionString(settings.SqlServerAddress, settings.DatabaseName, user, password, false);
    }

    public SqlContextBase(SqlDatabaseSettings settings)
    {
        connectionString = GetConnectionString(settings.SqlServerAddress, settings.DatabaseName, null, null, true);
    }

    public SqlContextBase(string sqlServerAddress, string databaseName)
    {
        connectionString = GetConnectionString(sqlServerAddress, databaseName, null, null, true);
    }

    public SqlContextBase(string sqlServerAddress, string databaseName, string user, string password)
    {
        connectionString = GetConnectionString(sqlServerAddress, databaseName, user, password, false);
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

    private static string GetConnectionString(string sqlServer, string sqlDatabase, string? user, string? password, bool useWindowsAuthentication)
    {
		SqlConnectionStringBuilder connectionStringBuilder = new SqlConnectionStringBuilder
		{
			DataSource = sqlServer,
			TrustServerCertificate = true
		};

		if (useWindowsAuthentication)
        {
            connectionStringBuilder.IntegratedSecurity = true;
        }
        else
        {
            connectionStringBuilder.IntegratedSecurity = false;
            connectionStringBuilder.UserID = user;
            connectionStringBuilder.Password = password;
        }

        connectionStringBuilder.InitialCatalog = sqlDatabase;

        return connectionStringBuilder.ConnectionString;
    }
}