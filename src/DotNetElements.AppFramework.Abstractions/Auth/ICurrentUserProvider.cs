namespace DotNetElements.AppFramework.Abstractions.Auth;

public interface ICurrentUserProvider
{
    Guid GetCurrentUserId();
    void SetTemporaryUserId(Guid userId);
}
