using System.ComponentModel;
using System.Diagnostics.Eventing.Reader;

namespace DotNetElements.Core;

public interface IEntity
{
	const string NoKey = "NOKEY";

	abstract bool HasKey { get; }

	string Key { get; }
}

public interface IEntity<TKey> : IEntity
	where TKey : notnull
{
	TKey Id { get; }
}

public interface ICreationAuditedEntity : IEntity
{
	Guid CreatorId { get; }

	DateTimeOffset CreationTime { get; }

	void SetCreationAudited(Guid creatorId, DateTimeOffset creationTime);
}

public interface IAuditedEntity : ICreationAuditedEntity
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

/// <summary>
/// To make use of Ef Cores concurrency check, add a <see cref="ConcurrencyCheckAttribute"/> to the property.
/// </summary>
public interface IHasVersion
{
	public Guid Version { get; set; }
}

public interface IUpdatable<TFrom>
{
	void Update(TFrom from, IAttachRelatedEntity attachRelatedEntity);
}

public interface IRelatedEntity<TSelf, TKey>
	where TSelf : IEntity<TKey>, IRelatedEntity<TSelf, TKey>
	where TKey : notnull
{
	static abstract TSelf CreateRefById(TKey id);
}

public abstract class Entity { }

public abstract class Entity<TKey> : Entity, IEntity<TKey>
	where TKey : notnull
{
	public TKey Id { get; protected set; } = default!;

	public bool HasKey => !Id.Equals(default(TKey));

	string IEntity.Key => HasKey ? Id.ToString()! : IEntity.NoKey;
}

public class CreationAuditedEntity<TKey> : Entity<TKey>, ICreationAuditedEntity
	where TKey : notnull
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

public class AuditedEntity<TKey> : CreationAuditedEntity<TKey>, IAuditedEntity
	where TKey : notnull
{
	public Guid? LastModifierId { get; private set; }

	public DateTimeOffset? LastModificationTime { get; private set; }

	public void SetModificationAudited(Guid lastModifierId, DateTimeOffset lastModificationTime)
	{
		LastModifierId = lastModifierId;
		LastModificationTime = lastModificationTime;
	}
}

public class PersistentEntity<TKey> : CreationAuditedEntity<TKey>, IDeletionAuditedEntity
	where TKey : notnull
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