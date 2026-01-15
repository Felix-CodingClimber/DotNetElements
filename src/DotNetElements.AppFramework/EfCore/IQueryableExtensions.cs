using DotNetElements.AppFramework.Abstractions.Entity;

namespace DotNetElements.AppFramework;

public static class IQueryableExtensions
{
    public static async Task<TEntity?> FindIdAsync<TEntity, TKey>(this IQueryable<TEntity> query, TKey id)
        where TEntity : class, IHasKey<TKey>
        where TKey : notnull, IEquatable<TKey>
    {
        return await query.FirstOrDefaultAsync(entity => entity.Id.Equals(id));
    }

	public static IQueryable<TEntity> WithId<TEntity, TKey>(this IQueryable<TEntity> query, TKey id)
		where TEntity : class, IHasKey<TKey>
		where TKey : notnull, IEquatable<TKey>
	{
		return query.Where(entity => entity.Id.Equals(id));
	}

	public static IQueryable<TEntity> ExcludeDeleted<TEntity>(this IQueryable<TEntity> query)
		where TEntity : class, IDeletionAuditedEntity
	{
		return query.Where(entity => !entity.IsDeleted);
	}
}
