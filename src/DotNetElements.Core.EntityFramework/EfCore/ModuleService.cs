namespace DotNetElements.Core.EntityFramework;

public abstract class ModuleService<TDbContext>
    where TDbContext : DbContext
{
    protected readonly TDbContext DbContext;

    protected ModuleService(TDbContext dbContext)
    {
        DbContext = dbContext;
    }

    protected bool EnsureVersion<TEntity, TKey>(TEntity entity, TEntity existingEntity)
        where TEntity : class, IEntity<TKey>, IEntityHasVersion
        where TKey : notnull, IEquatable<TKey>
    {
        if (entity.Version != existingEntity.Version)
            return false;

        entity.UpdateVersion();

        return true;
    }
}
