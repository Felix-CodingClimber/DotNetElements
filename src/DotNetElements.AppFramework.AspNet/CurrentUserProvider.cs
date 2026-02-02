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

	// todo consider caching the user id as CurrentUserProvider is scoped per request
	public Guid GetCurrentUserId()
	{
		if (temporaryUserId is not null)
			return temporaryUserId.Value;

		ArgumentNullException.ThrowIfNull(contextAccessor.HttpContext);

		return contextAccessor.HttpContext.User.GetRequiredValue<Guid>(ClaimTypes.NameIdentifier);
	}

	// todo consider caching the email as CurrentUserProvider is scoped per request
	public string GetCurrentUserEmail()
	{
		if (temporaryUserId is not null)
			throw new InvalidOperationException("Temporary user ID is set; email is not available.");

		ArgumentNullException.ThrowIfNull(contextAccessor.HttpContext);

		return contextAccessor.HttpContext.User.GetRequiredValue<string>(ClaimTypes.Email);
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
