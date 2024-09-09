using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace DotNetElements.Web.AspNetCore;

public class CurrentUserProviderWeb : ICurrentUserProvider
{
    private readonly IHttpContextAccessor contextAccessor;

    public CurrentUserProviderWeb(IHttpContextAccessor contextAccessor)
    {
        this.contextAccessor = contextAccessor;
    }

    public Guid GetCurrentUserId()
    {
        string? userId = contextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);

        // todo better error handling
        if (userId is null)
            throw new ArgumentNullException(nameof(userId));

        return new Guid(userId);
    }
}
