using BlazorCrud.Datahandling;

namespace BlazorCrud.Modules.BlogPostModule;

public class BlogPostRepository : Repository<AppDbContext, BlogPost, EditBlogPostModel, Guid>
{
	public BlogPostRepository(AppDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider)
		: base(dbContext, currentUserProvider, timeProvider)
	{
	}

	public override async Task<Result<BlogPost>> UpdateAsync(Guid id, EditBlogPostModel from)
	{
		return await UpdateIncludingRelatedEntities<BlogPost>(id, from);
	}
}
