namespace DotNetElements.Core;

public static class EntityHelper
{
	public static void UpdateRelatedEntities<TEntity, TModel, TKey>(List<TEntity> oldCollection, IEnumerable<TModel> newCollection, IAttachRelatedEntity attachRelatedEntity)
		where TEntity : Entity<TKey>, IRelatedEntity<TEntity, TKey>
		where TModel : Model<TKey>
		where TKey : notnull, IEquatable<TKey>
	{
		oldCollection.RemoveAll(existingTag => !newCollection.Any(newTag => newTag.Id.Equals(existingTag.Id)));
		var addedModels = newCollection.Where(newTag => !oldCollection.Any(existingTag => existingTag.Id.Equals(newTag.Id)));

		foreach (TModel model in addedModels)
			oldCollection.Add(attachRelatedEntity.AttachById<TEntity, TKey>(model.Id));
	}
}
