namespace DotNetElements.Core;

public interface IManagedRepository<TRepository, TEntity, TEditModel, TKey> : IRepository<TEntity, TKey>
	where TEntity : Entity<TKey>
	where TKey : notnull, IEquatable<TKey>
	where TRepository : IRepository<TEntity, TKey>
{ }
