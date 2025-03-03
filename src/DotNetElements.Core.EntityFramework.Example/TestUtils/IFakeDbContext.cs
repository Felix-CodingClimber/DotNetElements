namespace DotNetElements.Core.EntityFramework.Example;

internal interface IFakeDbContext
{
	public Action<string> LogAction { set; }
}
