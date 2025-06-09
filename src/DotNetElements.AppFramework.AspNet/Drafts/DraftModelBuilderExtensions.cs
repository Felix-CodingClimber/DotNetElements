using System.Linq.Expressions;
using DotNetElements.AppFramework.Abstractions.Drafts;

namespace DotNetElements.AppFramework.AspNet.Drafts;

public static class DraftModelBuilderExtensions
{
    public static void ConfigureDrafts<TOwner, TContent>(this ModelBuilder modelBuilder, Expression<Func<TOwner, IEnumerable<Draft<TContent>>?>> navigationExpression)
        where TOwner : Entity<Guid>
        where TContent : class
    {
        modelBuilder.Entity<TOwner>()
            .HasMany(navigationExpression)
            .WithOne()
            .HasForeignKey(e => e.OwnerId)
            .IsRequired();
    }
}
