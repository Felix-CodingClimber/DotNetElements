using System.Security.Claims;
using DotNetElements.AppFramework.Abstractions.Auth;
using DotNetElements.Core.Extensions;
using Microsoft.AspNetCore.Http;

namespace DotNetElements.AppFramework.AspNet;

public class CurrentUserProvider : ICurrentUserProvider
{
    private Guid? temporaryUserId;

    private readonly IHttpContextAccessor contextAccessor;

    public CurrentUserProvider(IHttpContextAccessor contextAccessor)
    {
        this.contextAccessor = contextAccessor;
    }

    public Guid GetCurrentUserId()
    {
        if (temporaryUserId is not null)
            return temporaryUserId.Value;

        ArgumentNullException.ThrowIfNull(contextAccessor.HttpContext);

        return contextAccessor.HttpContext.User.GetRequiredValue<Guid>(ClaimTypes.NameIdentifier);
    }

    public void SetTemporaryUserId(Guid userId)
    {
        temporaryUserId = userId;
    }
}
