using Microsoft.AspNetCore.Http;

namespace DotNetElements.Web.AspNetCore;

public class CurrentUserProviderWeb : ICurrentUserProvider
{
    private readonly IHttpContextAccessor contextAccessor;

    public CurrentUserProviderWeb(IHttpContextAccessor contextAccessor)
    {
        this.contextAccessor = contextAccessor;
    }

    // todo
    public Guid GetCurrentUserId()
    {
        return new Guid("e8d118e0-18c6-4fff-9d86-e91a915d8198");
    }
}
