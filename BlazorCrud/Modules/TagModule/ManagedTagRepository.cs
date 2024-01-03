namespace BlazorCrud.Modules.TagModule;

public class ManagedTagRepository : ManagedRepository<TagRepository, Tag, EditTagModel, Guid>
{
	public ManagedTagRepository(IScopedRepositoryFactory<TagRepository, Tag, EditTagModel, Guid> repositoryFactory)
		: base(repositoryFactory)
	{
	}
}
