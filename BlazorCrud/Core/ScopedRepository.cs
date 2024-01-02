namespace BlazorCrud.Core;

public sealed class ScopedRepository<TRepository, TEntity, TEditModel, TKey> : IDisposable
    where TEntity : Entity<TKey>, IUpdatableFromModel<TEditModel>
    where TKey : notnull
    where TRepository : IRepository<TEntity, TEditModel, TKey>
{
    public TRepository Repository { get; private init; }

    private readonly IServiceScope serviceScope;

    public ScopedRepository(IServiceScope serviceScope, TRepository repository)
    {
        this.serviceScope = serviceScope;
        Repository = repository;
    }

    public void Dispose() => serviceScope.Dispose();
}
