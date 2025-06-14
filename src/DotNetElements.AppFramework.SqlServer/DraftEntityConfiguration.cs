using DotNetElements.AppFramework.Abstractions.Drafts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DotNetElements.AppFramework.SqlServer;

public sealed class DraftEntityConfiguration<T> : IEntityTypeConfiguration<Draft<T>>
{
    public void Configure(EntityTypeBuilder<Draft<T>> builder)
    {
        builder
            .Property(entity => entity.CommitMessage)
            .HasMaxLength(255);
    }
}