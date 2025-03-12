using System.Security.Claims;
using DotNetElements.AppFramework.Abstractions.Auth;
using Microsoft.AspNetCore.Http;

namespace DotNetElements.AppFramework.AspNet;

public class CurrentUserProvider : ICurrentUserProvider
{
    private readonly IHttpContextAccessor contextAccessor;

    public CurrentUserProvider(IHttpContextAccessor contextAccessor)
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
