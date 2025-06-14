using System.Linq.Expressions;
using DotNetElements.AppFramework.Abstractions.Drafts;

namespace DotNetElements.AppFramework.AspNet.Drafts;

public static class DraftModelBuilderExtensions
{
    // todo currently not used.
    // For this to make sense we would need to update the DraftsService to support multiple drafts per owner.
    // We would also need to update the endpoints to support multiple drafts per owner.
    //public static void ConfigureDrafts<TOwner, TContent>(this ModelBuilder modelBuilder, Expression<Func<TOwner, IEnumerable<Draft<TContent>>?>> navigationExpression)
    //    where TOwner : Entity<Guid>
    //    where TContent : class
    //{
    //    modelBuilder.Entity<TOwner>()
    //        .HasMany(navigationExpression)
    //        .WithOne()
    //        .HasForeignKey(e => e.OwnerId)
    //        .IsRequired();
    //}

    public static void ConfigureDrafts<TOwner, TContent>(this ModelBuilder modelBuilder, Expression<Func<TOwner, Draft<TContent>?>> navigationExpression)
        where TOwner : Entity<Guid>
        where TContent : class
    {
        modelBuilder.Entity<TOwner>()
            .HasOne(navigationExpression)
            .WithOne()
            .HasForeignKey<Draft<TContent>>(e => e.OwnerId)
            .IsRequired();
    }
}
