namespace BlazorCrud.Core;

public interface IRepositoryFactory<TEntity, TEditModel, TKey>
    where TEntity : Entity<TKey>, IUpdatableFromModel<TEditModel>
    where TKey : notnull
{
    IRepository<TEntity, TEditModel, TKey> Create();
}