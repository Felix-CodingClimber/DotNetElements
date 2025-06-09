using DotNetElements.AppFramework.Abstractions.Drafts;

namespace DotNetElements.AppFramework.AspNet.Drafts;

public interface IDbSetDraft<TContent>
    where TContent : class
{
    public DbSet<Draft<TContent>> Drafts { get; }
}
