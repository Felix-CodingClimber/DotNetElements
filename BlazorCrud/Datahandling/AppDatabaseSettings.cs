namespace BlazorCrud.Datahandling;

public class AppDatabaseSettings : SqLiteDatabaseSettings, ISettings
{
	public static string ConfigurationSectionName => "AppDatabaseSettings";
}
