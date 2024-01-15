namespace DotNetElements.Core.Test.TestData;

public class ManagedBlogPostRepository : ManagedRepository<BlogPostRepository, BlogPost, Guid>
{
	public ManagedBlogPostRepository(IScopedRepositoryFactory<BlogPostRepository, BlogPost, Guid> repositoryFactory)
		: base(repositoryFactory)
	{
	}
}
