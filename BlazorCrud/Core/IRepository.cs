using System.Linq.Expressions;

namespace BlazorCrud.Core;
public interface IRepository<TEntity, TKey> : IReadOnlyRepository<TEntity, TKey>
	where TEntity : Entity<TKey>
	where TKey : notnull
{
	Task ClearTable();

	Task<Result<TEntity>> CreateAsync(TEntity entity, Expression<Func<TEntity, bool>>? checkDuplicate = null);

	Task<Result<TSelf>> CreateOrUpdateAsync<TSelf>(
		TKey id,
		TSelf entity,
		Expression<Func<TSelf, bool>>? checkDuplicate = null)
		where TSelf : Entity<TKey>, IUpdatable<TSelf>;

	Task<Result> DeleteAsync(TKey id);

	Task<Result<TUpdatableEntity>> UpdateAsync<TUpdatableEntity, TFrom>(
		TKey id,
		TFrom from)
		where TUpdatableEntity : Entity<TKey>, IUpdatable<TFrom>;
}