namespace BlazorCrud.Core;

public interface ICurrentUserProvider
{
	Guid GetCurrentUserId();
}
