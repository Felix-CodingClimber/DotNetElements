﻿using BlazorCrud.Datahandling;

namespace BlazorCrud.Modules.BlogPostModule;

public class BlogPostRepository : Repository<AppDbContext, BlogPost, Guid>
{
	public BlogPostRepository(AppDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider)
		: base(dbContext, currentUserProvider, timeProvider)
	{
	}
}
