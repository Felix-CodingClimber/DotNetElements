namespace DotNetElements.AppFramework.Abstractions.Auth;

public interface ICurrentUserProvider
{
	Guid GetCurrentUserId();
	string GetCurrentUserEmail();
	void SetTemporaryUserId(Guid userId);
	void ResetTemporaryUserId();
}
