namespace DotNetElements.Core.Test.TestData;

internal class ManagedTagRepository : ManagedRepository<FakeTagRepository, Tag, Guid>
{
	public ManagedTagRepository(IScopedRepositoryFactory<FakeTagRepository, Tag, Guid> repositoryFactory)
		: base(repositoryFactory)
	{
	}
}
