namespace DotNetElements.Core;

public interface IAttachRelatedEntity
{
	TRelatedEntity AttachById<TRelatedEntity, TKey>(TKey id)
		where TRelatedEntity : Entity<TKey>, IRelatedEntity<TRelatedEntity, TKey>
		where TKey : notnull;
}
