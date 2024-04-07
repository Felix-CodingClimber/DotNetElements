namespace DotNetElements.Web.AspNetCore;

public class FakeCurrentUserProviderWeb : ICurrentUserProvider
{
    private readonly Guid fakeUserId;

    public FakeCurrentUserProviderWeb(Guid fakeUserId)
    {
        this.fakeUserId = fakeUserId;
    }

    public Guid GetCurrentUserId()
    {
        return fakeUserId;
    }
}
