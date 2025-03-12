using System.Linq.Expressions;

namespace DotNetElements.Core;

public interface IRepository<TEntity, TKey> : IReadOnlyRepository<TEntity, TKey>
	where TEntity : Entity<TKey>
	where TKey : notnull, IEquatable<TKey>
{
	Task ClearTable();

	Task<CrudResult<TEntity>> CreateAsync(TEntity entity, Expression<Func<TEntity, bool>>? checkDuplicate = null);

	Task<CrudResult<TSelf>> CreateOrUpdateAsync<TSelf>(TKey id, TSelf entity, Expression<Func<TSelf, bool>>? checkDuplicate = null)
		where TSelf : Entity<TKey>, IUpdatable<TSelf>;

	Task<CrudResult> DeleteAsync<TEntityToDelete>(TEntityToDelete entityToDelete)
		where TEntityToDelete : IHasKey<TKey>;

    Task<CrudResult<TEntity>> UpdateAsync<TFrom>(TKey id, TFrom from)
		where TFrom : notnull;
}