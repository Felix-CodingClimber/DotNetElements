namespace DotNetElements.Core;

public interface IAttachRelatedEntity
{
	TRelatedEntity AttachById<TRelatedEntity, TKey>(TKey id, bool checkAlreadyTracked = false)
		where TRelatedEntity : Entity<TKey>, IRelatedEntity<TRelatedEntity, TKey>
		where TKey : notnull, IEquatable<TKey>;
}
