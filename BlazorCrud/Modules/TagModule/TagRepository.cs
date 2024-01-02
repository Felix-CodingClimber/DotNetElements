using BlazorCrud.Datahandling;

namespace BlazorCrud.Modules.TagModule;

public class TagRepository : Repository<AppDbContext, Tag, EditTagModel, Guid>
{
	public TagRepository(AppDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider)
		: base(dbContext, currentUserProvider, timeProvider)
	{
	}
}
