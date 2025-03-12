using Microsoft.Data.SqlClient;

namespace DotNetElements.Core;

public static class SqlConnectionHelper
{
    public static string GetConnectionString(string sqlServer, string sqlDatabase, string? user, string? password, bool useWindowsAuthentication)
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
