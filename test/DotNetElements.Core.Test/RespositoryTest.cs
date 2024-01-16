using DotNetElements.Core.Test.TestData;

namespace DotNetElements.Core.Test;

[TestClass]
public class ReadOnlyRepositoryTest
{
	[TestMethod]
	public async Task CreateAsync_AuditedEntity_DbHasValidEntityWithId()
	{
		using FakeRepositoryFactory<TestDbContext, FakeTagRepository, Tag, Guid> factory = new();

		// Create entity
		using (FakeTagRepository tagRepo = factory.CreateRepository())
		{
			CrudResult<Tag> result = await tagRepo.CreateAsync(FakeEntities.TagOne);

			result.IsOk.Should().BeTrue();

			result.Value.Should().BeEquivalentTo(FakeEntities.TagOne, options => options
				.Excluding(entity => entity.Id)
				.Excluding(entity => entity.CreatorId)
				.Excluding(entity => entity.CreationTime));

			result.Value.Id.Should().NotBeEmpty();
			result.Value.CreatorId.Should().Be(factory.UserProvider.GetCurrentUserId());
			result.Value.CreationTime.Should().Be(factory.TimeProvider.GetUtcNow());
		}

		// Assert creation result
		using (FakeTagRepository tagRepo = factory.CreateRepository())
		{
			IReadOnlyList<Tag> tagsFromDb = await tagRepo.GetAllAsync();

			tagsFromDb.Count.Should().Be(1);

			tagsFromDb[0].Should().BeEquivalentTo(FakeEntities.TagOne, options => options
				.Excluding(entity => entity.Id)
				.Excluding(entity => entity.CreatorId)
				.Excluding(entity => entity.CreationTime));

			tagsFromDb[0].Id.Should().NotBeEmpty();
			tagsFromDb[0].CreatorId.Should().Be(factory.UserProvider.GetCurrentUserId());
			tagsFromDb[0].CreationTime.Should().Be(factory.TimeProvider.GetUtcNow());
		}
	}

	[TestMethod]
	public async Task UpdateAsync_AuditedEntity_DbHasEntityWithUpdatedValues()
	{
		using FakeRepositoryFactory<TestDbContext, FakeTagRepository, Tag, Guid> factory = new();

		// Create entity
		using (FakeTagRepository tagRepo = factory.CreateRepository())
		{
			await tagRepo.CreateAsync(FakeEntities.TagOne);
		}

		// Update entity
		Tag? tagBeforeUpdate = null;
		const string updatedLabelValue = "Updated Label";
		DateTimeOffset utcUpdateTime = factory.TimeProvider.GetUtcNow().AddDays(1);
		Guid updateUserId = FakeCurrentUserProvider.FakeUserIdTwo;

		using (FakeTagRepository tagRepo = factory.CreateRepository())
		{
			IReadOnlyList<Tag> tagsFromDb = await tagRepo.GetAllAsync();

			tagsFromDb.Count.Should().Be(1);
			tagBeforeUpdate = tagsFromDb[0];

			// Update value
			EditTagModel editTagModel = new(tagBeforeUpdate.MapToModel())
			{
				Label = updatedLabelValue
			};

			// Set new time and userId
			factory.TimeProvider.SetUtcNow(utcUpdateTime);
			factory.UserProvider.SetCurrentUserId(updateUserId);

			CrudResult<Tag> result = await tagRepo.UpdateAsync<Tag, EditTagModel>(editTagModel.Id, editTagModel);

			// todo valide result here (see CreateAsync Test)
		}

		// Assert update result
		using (FakeTagRepository tagRepo = factory.CreateRepository())
		{
			IReadOnlyList<Tag> tagsFromDb = await tagRepo.GetAllAsync();

			tagsFromDb[0].Should().BeEquivalentTo(tagBeforeUpdate, options => options
				.Excluding(entity => entity.Label)
				.Excluding(entity => entity.LastModifierId)
				.Excluding(entity => entity.LastModificationTime)
				.Excluding(entity => entity.Version));

			tagsFromDb[0].Label.Should().Be(updatedLabelValue);
			tagsFromDb[0].LastModifierId.Should().Be(updateUserId);
			tagsFromDb[0].LastModificationTime.Should().Be(utcUpdateTime);
			tagsFromDb[0].Version.Should().NotBe(tagBeforeUpdate.Version);
		}
	}

	[TestMethod]
	public async Task UpdateAsync_VersionedEntity_ReturnsCrudErrorConcurrencyConflict()
	{
		using FakeRepositoryFactory<TestDbContext, FakeTagRepository, Tag, Guid> factory = new();

		// Create entity
		using (FakeTagRepository tagRepo = factory.CreateRepository())
		{
			await tagRepo.CreateAsync(FakeEntities.TagOne);
		}

		// Get entity from user 1
		IReadOnlyList<Tag> tagsForUser1;
		using (FakeTagRepository tagRepo = factory.CreateRepository())
		{
			tagsForUser1 = await tagRepo.GetAllAsync();
		}

		// Update entity from user 2
		using (FakeTagRepository tagRepo = factory.CreateRepository())
		{
			IReadOnlyList<Tag> tagsFromDb = await tagRepo.GetAllAsync();

			// Update value
			EditTagModel editTagModel = new(tagsFromDb[0].MapToModel())
			{
				Label = "Updated Label User 2"
			};

			await tagRepo.UpdateAsync<Tag, EditTagModel>(editTagModel.Id, editTagModel);
		}

		// Assert update fails for user 1
		using (FakeTagRepository tagRepo = factory.CreateRepository())
		{
			// Update value
			EditTagModel editTagModel = new(tagsForUser1[0].MapToModel())
			{
				Label = "Updated Label User 1"
			};

			CrudResult<Tag> result = await tagRepo.UpdateAsync<Tag, EditTagModel>(editTagModel.Id, editTagModel);

			result.IsFail.Should().BeTrue();
			result.ErrorCode.Should().Be(CrudError.ConcurrencyConflict);
		}
	}
}