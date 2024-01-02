using System.Linq.Expressions;

namespace BlazorCrud.Core;
public interface IRepository<TEntity, TEditModel, TKey> : IReadOnlyRepository<TEntity, TKey>
    where TEntity : Entity<TKey>, IUpdatableFromModel<TEditModel>
    where TKey : notnull
{
    Task<Result<TEntity>> CreateAsync(TEntity entity, Expression<Func<TEntity, bool>>? checkDuplicate = null);
    Task<Result<TSelf>> CreateOrUpdateAsync<TSelf>(TKey id, TSelf entity) where TSelf : Entity<TKey>, IUpdatableFromSelf<TSelf>;
    Task<Result> DeleteAsync(TKey id);
    Task<Result<TEntity>> UpdateAsync(TKey id, TEditModel from);
    Task<Result<TSelf>> UpdateFromSelfAsync<TSelf>(TKey id, TSelf from) where TSelf : Entity<TKey>, IUpdatableFromSelf<TSelf>;
}