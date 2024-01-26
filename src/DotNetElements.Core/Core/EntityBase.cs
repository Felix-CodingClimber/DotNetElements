using System.ComponentModel;

namespace DotNetElements.Core;

public interface IEntity<TKey> : IHasKey<TKey>
	where TKey : notnull, IEquatable<TKey>;

public interface ICreationAuditedEntity<TKey> : IEntity<TKey>
	where TKey : notnull, IEquatable<TKey>
{
	Guid CreatorId { get; }

	DateTimeOffset CreationTime { get; }

	void SetCreationAudited(Guid creatorId, DateTimeOffset creationTime);
}

public interface IAuditedEntity<TKey> : ICreationAuditedEntity<TKey>
		where TKey : notnull, IEquatable<TKey>
{
	Guid? LastModifierId { get; }

	DateTimeOffset? LastModificationTime { get; }

	bool HasChanged => LastModificationTime is null;

	void SetModificationAudited(Guid lastModifierId, DateTimeOffset lastModificationTime);
}

public interface ISoftDelete
{
	bool IsDeleted { get; }

	void Delete();
}

public interface IHasDeletionTime : ISoftDelete
{
	DateTimeOffset? DeletionTime { get; }

	void Delete(DateTimeOffset deletionTime);
}

public interface IDeletionAuditedEntity : IHasDeletionTime
{
	Guid? DeleterId { get; }

	void Delete(Guid deleterId, DateTimeOffset deletionTime);
}

public interface IUpdatable<TFrom>
{
	void Update(TFrom from, IAttachRelatedEntity attachRelatedEntity);
}

public interface IRelatedEntity<TSelf, TKey>
	where TSelf : IEntity<TKey>, IRelatedEntity<TSelf, TKey>
	where TKey : notnull, IEquatable<TKey>
{
	static abstract TSelf CreateRefById(TKey id);
}

public abstract class Entity { }

public abstract class Entity<TKey> : Entity, IEntity<TKey>
	where TKey : notnull, IEquatable<TKey>
{
	public TKey Id { get; protected set; } = default!;
}

public class CreationAuditedEntity<TKey> : Entity<TKey>, ICreationAuditedEntity<TKey>
	where TKey : notnull, IEquatable<TKey>
{
	public Guid CreatorId { get; private set; }

	public DateTimeOffset CreationTime { get; private set; }

	public void SetCreationAudited(Guid creatorId, DateTimeOffset creationTime)
	{
		if (CreatorId != default)
			throw new InvalidOperationException("Can not set audit parameters of a already created entity");

		CreatorId = creatorId;
		CreationTime = creationTime;
	}
}

public class AuditedEntity<TKey> : CreationAuditedEntity<TKey>, IAuditedEntity<TKey>
	where TKey : notnull, IEquatable<TKey>
{
	public Guid? LastModifierId { get; private set; }

	public DateTimeOffset? LastModificationTime { get; private set; }

	public void SetModificationAudited(Guid lastModifierId, DateTimeOffset lastModificationTime)
	{
		LastModifierId = lastModifierId;
		LastModificationTime = lastModificationTime;
	}
}

public class PersistentEntity<TKey> : AuditedEntity<TKey>, IDeletionAuditedEntity
	where TKey : notnull, IEquatable<TKey>
{
	public bool IsDeleted { get; private set; }

	public Guid? DeleterId { get; private set; }

	public DateTimeOffset? DeletionTime { get; private set; }

	public void Delete(Guid deleterId, DateTimeOffset deletionTime)
	{
		if (IsDeleted)
			throw new InvalidOperationException("Can not delete an already deleted entity");

		IsDeleted = true;
		DeleterId = deleterId;
		DeletionTime = deletionTime;
	}

	[EditorBrowsable(EditorBrowsableState.Never)]
	public void Delete(DateTimeOffset deletionTime) => throw new NotImplementedException();

	[EditorBrowsable(EditorBrowsableState.Never)]
	public void Delete() => throw new NotImplementedException();
}