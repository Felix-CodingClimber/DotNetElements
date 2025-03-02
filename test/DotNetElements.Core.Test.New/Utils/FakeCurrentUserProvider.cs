
namespace DotNetElements.Core.Test.Utils;

internal class FakeCurrentUserProvider : ICurrentUserProvider
{
	public static readonly Guid FakeUserIdOne = new Guid("DC0BA927-FBAE-4DCA-8BAE-C1C70CBB948D");
	public static readonly Guid FakeUserIdTwo = new Guid("65FA2034-6544-43E3-AF5C-DF311AE1B076");

	public static Guid DefaultUserId => FakeUserIdOne;

	private Guid currentUser = DefaultUserId;

	public void SetCurrentUserId(Guid userId) => currentUser = userId;

	public Guid GetCurrentUserId() => currentUser;
}
