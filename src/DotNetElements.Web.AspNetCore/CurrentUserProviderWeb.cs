using DotNetElements.Core;
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
        return new Guid("FF4F759C-0916-4611-9B66-306543A51B2A");
    }
}
