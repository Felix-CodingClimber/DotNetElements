namespace DotNetElements.Core;

public interface ICurrentUserProvider
{
	Guid GetCurrentUserId();
}
