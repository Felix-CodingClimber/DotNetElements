namespace BlazorCrud.Modules.BlogPostModule;

public class ManagedBlogPostRepository : ManagedRepository<BlogPostRepository, BlogPost, EditBlogPostModel, Guid>
{
	public ManagedBlogPostRepository(IScopedRepositoryFactory<BlogPostRepository, BlogPost, EditBlogPostModel, Guid> repositoryFactory)
		: base(repositoryFactory)
	{
	}
}
