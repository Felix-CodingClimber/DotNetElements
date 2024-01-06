namespace DotNetElements.Datahandling;

public class AppDatabaseSettings : SqLiteDatabaseSettings, ISettings
{
	public static string ConfigurationSectionName => "AppDatabaseSettings";
}
