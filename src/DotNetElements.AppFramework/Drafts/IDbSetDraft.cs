using DotNetElements.AppFramework.Abstractions.Drafts;

namespace DotNetElements.AppFramework;

public interface IDbSetDraft<T>
{
    public DbSet<Draft<T>> Drafts { get; }
}
