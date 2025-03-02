namespace DotNetElements.Core.EntityFramework;

public static class IQueryableExtensions
{
    public static async Task<TEntity?> FindAsync<TEntity, TKey>(this IQueryable<TEntity> query, TKey id)
        where TEntity : class, IHasKey<TKey>
        where TKey : notnull, IEquatable<TKey>
    {
        return await query.FirstOrDefaultAsync(entity => entity.Id.Equals(id));
    }
}
