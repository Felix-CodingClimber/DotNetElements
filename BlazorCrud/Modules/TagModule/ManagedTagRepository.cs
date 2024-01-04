namespace BlazorCrud.Modules.TagModule;

public class ManagedTagRepository : ManagedRepository<TagRepository, Tag, Guid>
{
	public ManagedTagRepository(IScopedRepositoryFactory<TagRepository, Tag, Guid> repositoryFactory)
		: base(repositoryFactory)
	{
	}
}
