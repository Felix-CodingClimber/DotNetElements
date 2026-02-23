using DotNetElements.AppFramework.Abstractions.Auth;

namespace DotNetElements.AppFramework.DebugEfCore;

// todo
internal sealed class FakeCurrentUserProvider : ICurrentUserProvider
{
    public static readonly Guid FakeUserIdOne = new Guid("DC0BA927-FBAE-4DCA-8BAE-C1C70CBB948D");
    public static readonly Guid FakeUserIdTwo = new Guid("65FA2034-6544-43E3-AF5C-DF311AE1B076");

    public static Guid DefaultUserId => FakeUserIdOne;

    private Guid currentUser = DefaultUserId;

    public void SetCurrentUserId(Guid userId) => currentUser = userId;

    public Guid GetCurrentUserId() => currentUser;

    Guid? ICurrentUserProvider.GetCurrentUserId()
    {
        return GetCurrentUserId();
    }

    public Guid GetRequiredCurrentUserId()
    {
        throw new NotImplementedException();
    }

    public string GetCurrentUserEmail()
    {
        throw new NotImplementedException();
    }

    public void SetTemporaryUserId(Guid userId)
    {
        throw new NotImplementedException();
    }

    public void ResetTemporaryUserId()
    {
        throw new NotImplementedException();
    }
}
