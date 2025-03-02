namespace DotNetElements.Core.EntityFramework;

public interface ICurrentUserProvider
{
    Guid GetCurrentUserId();
}
