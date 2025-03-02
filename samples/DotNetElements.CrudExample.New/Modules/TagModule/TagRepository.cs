using DotNetElements.Datahandling;

namespace DotNetElements.CrudExample.Modules.TagModule;

public class TagRepository : Repository<AppDbContext, Tag, Guid>
{
	public TagRepository(AppDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider)
		: base(dbContext, currentUserProvider, timeProvider)
	{
	}
}
