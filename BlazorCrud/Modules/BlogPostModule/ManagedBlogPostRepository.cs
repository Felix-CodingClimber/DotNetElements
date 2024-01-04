namespace BlazorCrud.Modules.BlogPostModule;

public class ManagedBlogPostRepository : ManagedRepository<BlogPostRepository, BlogPost, Guid>
{
	public ManagedBlogPostRepository(IScopedRepositoryFactory<BlogPostRepository, BlogPost, Guid> repositoryFactory)
		: base(repositoryFactory)
	{
	}
}
