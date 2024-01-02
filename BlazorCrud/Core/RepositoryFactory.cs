namespace BlazorCrud.Core;

public class RepositoryFactory<TEntity, TEditModel, TKey> : IRepositoryFactory<TEntity, TEditModel, TKey>
    where TEntity : Entity<TKey>, IUpdatableFromModel<TEditModel>
    where TKey : notnull
{
    private readonly IServiceProvider serviceProvider;

    public RepositoryFactory(IServiceProvider serviceProvider)
    {
        this.serviceProvider = serviceProvider;
    }

    public ScopedRepository<TRepository, TEntity, TEditModel, TKey> Create()
    {
        IServiceScope scope = serviceProvider.CreateScope();

        var scopedRepo = scope.ServiceProvider.GetRequiredService<ScopedRepository<TEntity, TEditModel, TKey>>();

        return scopedRepo;
    }
}
