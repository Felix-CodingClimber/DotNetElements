using DotNetElements.Core.Test.TestData;

namespace DotNetElements.Core.Test;

[TestClass]
public class ReadOnlyRepositoryTest
{
	[TestMethod]
	public async Task CreateAsync_SingleEntity_ReturnsValidEntityWithId()
	{
		using FakeRepositoryFactory<TestDbContext, FakeTagRepository, Tag, Guid> factory = new();

		using (FakeTagRepository tagRepo = factory.CreateRepository())
		{
			CrudResult<Tag> result = await tagRepo.CreateAsync(FakeEntities.TagOne);
		}

		using (FakeTagRepository tagRepo = factory.CreateRepository())
		{
			IReadOnlyList<Tag> result = await tagRepo.GetAllAsync();

			result.Count.Should().Be(1);

			result[0].Should().BeEquivalentTo(FakeEntities.TagOne,
				options => options
				.Excluding(entity => entity.Id)
				.Excluding(entity => entity.CreatorId)
				.Excluding(entity => entity.CreationTime));

			result[0].Id.Should().NotBeEmpty();
			result[0].CreatorId.Should().Be(FakeCurrentUserProvider.);
		}
	}
}