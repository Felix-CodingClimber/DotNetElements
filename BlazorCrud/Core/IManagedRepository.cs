namespace BlazorCrud.Core;

public interface IManagedRepository<TRepository, TEntity, TEditModel, TKey> : IRepository<TEntity, TEditModel, TKey>
	where TEntity : Entity<TKey>, IUpdatableFromModel<TEditModel>
	where TKey : notnull
	where TRepository : IRepository<TEntity, TEditModel, TKey>
{ }
