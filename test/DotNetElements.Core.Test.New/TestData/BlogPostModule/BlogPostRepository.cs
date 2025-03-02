namespace DotNetElements.Core.Test.TestData;

public class BlogPostRepository : Repository<TestDbContext, BlogPost, Guid>
{
	public BlogPostRepository(TestDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider)
		: base(dbContext, currentUserProvider, timeProvider)
	{
	}
}
