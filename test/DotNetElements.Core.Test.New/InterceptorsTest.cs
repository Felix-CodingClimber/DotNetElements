using DotNetElements.Core.Test.TestData;

namespace DotNetElements.Core.Test;

[TestClass]
public class InterceptorsTest
{
	[TestMethod]
	public async Task RemoveAsync_IDeletionAuditedEntity_DbHasEntityWithDeletionInfo()
	{
		using FakeDbContextFactory<TestDbContext> factory = new();

		// Create entity
		using (TestDbContext dbContext = factory.CreateContext())
		{
			dbContext.Tags.Add(FakeEntities.TagOne);

			await dbContext.SaveChangesAsync();
        }

		// Get entity
		Tag? tagBeforeDelete= null;

        using (TestDbContext dbContext = factory.CreateContext())
        {
			IReadOnlyList<Tag> tagsFromDb = await dbContext.Tags.ToListAsync();

			tagsFromDb.Count.Should().Be(1);
            tagBeforeDelete = tagsFromDb[0];
		}

        // Delete entity
        using (TestDbContext dbContext = factory.CreateContext())
        {
			factory.UserProvider.SetCurrentUserId(FakeCurrentUserProvider.FakeUserIdOne);

            dbContext.Remove(tagBeforeDelete);

            await dbContext.SaveChangesAsync();
        }

        // Assert delete result
        using (TestDbContext dbContext = factory.CreateContext())
        {
            IReadOnlyList<Tag> tagsFromDb = await dbContext.Tags.ToListAsync();

			tagsFromDb[0].Should().BeEquivalentTo(tagBeforeDelete, options => options
				.Excluding(entity => entity.IsDeleted)
				.Excluding(entity => entity.DeleterId)
				.Excluding(entity => entity.DeletionTime));

			tagsFromDb[0].DeleterId.Should().Be(FakeCurrentUserProvider.FakeUserIdOne);
			tagsFromDb[0].IsDeleted.Should().Be(true);
			tagsFromDb[0].DeletionTime.Should().Be(factory.TimeProvider.GetUtcNow());
		}
	}

    [TestMethod]
    public async Task TestAsync_IDeletionAuditedEntity_DbHasEntityWithDeletionInfo()
    {
        using FakeDbContextFactory<TestDbContext> factory = new();

        // Create entity
        using (TestDbContext dbContext = factory.CreateContext())
        {
            Tag newTag = FakeEntities.TagOne;
            newTag.Version = Guid.NewGuid();

            dbContext.Tags.Add(newTag);

            await dbContext.SaveChangesAsync();
        }

        // Get entity for both users
        Tag? tagBeforeUpdate = null;

        using (TestDbContext dbContext = factory.CreateContext())
        {
            IReadOnlyList<Tag> tagsFromDb = await dbContext.Tags.ToListAsync();

            tagsFromDb.Count.Should().Be(1);
            tagBeforeUpdate = tagsFromDb[0];
        }

        // Update entity from the first user
        using (TestDbContext dbContext = factory.CreateContext())
        {
            factory.UserProvider.SetCurrentUserId(FakeCurrentUserProvider.FakeUserIdOne);

            IReadOnlyList<Tag> tagsFromDb = await dbContext.Tags.ToListAsync();

            tagsFromDb.Count.Should().Be(1);

            if(tagBeforeUpdate.Version != tagsFromDb[0].Version)
            {
                throw new Exception("Version mismatch");
            }

            dbContext.Database.ExecuteSqlRaw($"UPDATE Tags SET Version = '{Guid.NewGuid()}'");

            EditTagModel editModel = new(tagsFromDb[0].MapToModel())
            {
                Label = "Update label 1"
            };

            tagsFromDb[0].Update(editModel);
            tagsFromDb[0].Version = Guid.NewGuid();

            await dbContext.SaveChangesAsync();
        }

        // Update entity from the second user
        using (TestDbContext dbContext = factory.CreateContext())
        {
            factory.UserProvider.SetCurrentUserId(FakeCurrentUserProvider.FakeUserIdTwo);

            IReadOnlyList<Tag> tagsFromDb = await dbContext.Tags.ToListAsync();

            tagsFromDb.Count.Should().Be(1);

            if (tagBeforeUpdate.Version != tagsFromDb[0].Version)
            {
                throw new Exception("Version mismatch");
            }

            EditTagModel editModel = new(tagsFromDb[0].MapToModel())
            {
                Label = "Update label 2"
            };

            // We need to set the original value of the version property to the value of the entity we got from the database
            dbContext.Entry(tagsFromDb[0]).OriginalValues[nameof(IHasVersion.Version)] = tagBeforeUpdate.Version;
            tagsFromDb[0].Update(editModel);
            tagsFromDb[0].Version = Guid.NewGuid();

            await dbContext.SaveChangesAsync();
        }

        // Assert update result
        using (TestDbContext dbContext = factory.CreateContext())
        {
            IReadOnlyList<Tag> tagsFromDb = await dbContext.Tags.ToListAsync();

            tagsFromDb[0].Should().BeEquivalentTo(tagBeforeUpdate, options => options
                .Excluding(entity => entity.Label)
                .Excluding(entity => entity.Version)
                .Excluding(entity => entity.IsDeleted)
                .Excluding(entity => entity.DeleterId)
                .Excluding(entity => entity.DeletionTime));
        }
    }
}