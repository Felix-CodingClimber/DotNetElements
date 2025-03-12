namespace DotNetElements.AppFramework.DebugEfCore;

internal interface IFakeDbContext
{
	public Action<string> LogAction { set; }
}
