namespace DotNetElements.Core;

public interface IScopedRepositoryFactory<TRepository, TEntity, TKey>
    where TEntity : Entity<TKey>
    where TKey : notnull, IEquatable<TKey>
	where TRepository : IRepository<TEntity, TKey>
{
	ScopedRepository<TRepository, TEntity, TKey> Create();
}