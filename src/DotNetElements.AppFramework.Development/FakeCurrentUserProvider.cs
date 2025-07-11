using DotNetElements.AppFramework.Abstractions.Auth;

namespace DotNetElements.AppFramework.Development;

public sealed class FakeCurrentUserProvider : ICurrentUserProvider
{
    private Guid? temporaryUserId;

    private readonly Guid fakeUserId;

    public FakeCurrentUserProvider(Guid fakeUserId)
    {
        this.fakeUserId = fakeUserId;
    }

    public Guid GetCurrentUserId()
    {
        if (temporaryUserId is not null)
            return temporaryUserId.Value;

        return fakeUserId;
    }

    public void SetTemporaryUserId(Guid userId)
    {
        temporaryUserId = userId;
    }
}
