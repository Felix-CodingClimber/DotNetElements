using DotNetElements.AppFramework.Abstractions.Auth;

namespace DotNetElements.AppFramework.Development;

public sealed class FakeCurrentUserProvider : ICurrentUserProvider
{
    private readonly Guid fakeUserId;

    public FakeCurrentUserProvider(Guid fakeUserId)
    {
        this.fakeUserId = fakeUserId;
    }

    public Guid GetCurrentUserId()
    {
        return fakeUserId;
    }
}
