using DotNetElements.AppFramework.Abstractions.Auth;

namespace DotNetElements.AppFramework.Development;

public sealed class FakeCurrentUserProvider : ICurrentUserProvider
{
    private Guid? temporaryUserId;

    private readonly Guid fakeUserId;
    private readonly string fakeUserEmail;

    public FakeCurrentUserProvider(Guid fakeUserId, string fakeUserEmail)
    {
        this.fakeUserId = fakeUserId;
        this.fakeUserEmail = fakeUserEmail;
    }

    public Guid? GetCurrentUserId()
    {
        if (temporaryUserId is not null)
            return temporaryUserId.Value;

        return fakeUserId;
    }

    public Guid GetRequiredCurrentUserId()
    {
        if (temporaryUserId is not null)
            return temporaryUserId.Value;

        return fakeUserId;
    }

    public string GetCurrentUserEmail()
    {
        if (temporaryUserId is not null)
            throw new InvalidOperationException("Temporary user ID is set; email is not available.");

        return fakeUserEmail;
    }

    public void SetTemporaryUserId(Guid userId)
    {
        temporaryUserId = userId;
    }

    public void ResetTemporaryUserId()
    {
        temporaryUserId = null;
    }
}
