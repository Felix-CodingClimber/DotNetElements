namespace DotNetElements.AppFramework.Abstractions.Auth;

public interface ICurrentUserProvider
{
	Guid? GetCurrentUserId();
	Guid GetRequiredCurrentUserId();
	string GetCurrentUserEmail();
	void SetTemporaryUserId(Guid userId);
	void ResetTemporaryUserId();
}
