namespace DotNetElements.Core.EntityFramework;

// ToListAsync is not used because it performs poorly!
// Mainly because of VARCHAR(max) columns (lots of data)
// See here: https://stackoverflow.com/questions/28543293/entity-framework-async-operation-takes-ten-times-as-long-to-complete/28619983
// or here: https://github.com/dotnet/SqlClient/issues/245
// or here: https://github.com/dotnet/ef6/issues/88
public static class PagedListQueryExtensions
{
    public static async Task<IPagedList<T>> ToPagedListAsync<T>(this IQueryable<T> source, int page, int pageSize, CancellationToken cancellationToken = default)
    {
        int count = await source.CountAsync(cancellationToken);

        if (count == 0)
            return PagedList<T>.Empty;

        T[] items = source
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToArray();

        return new PagedList<T>(items, count, page, pageSize);
    }
}
