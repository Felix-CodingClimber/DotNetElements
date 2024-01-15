namespace DotNetElements.Core.Test.TestData;

internal class FakeTagRepository : FakeRepository<TestDbContext, Tag, Guid>
{
	public FakeTagRepository(TestDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider)
		: base(dbContext, currentUserProvider, timeProvider)
	{
	}
}
