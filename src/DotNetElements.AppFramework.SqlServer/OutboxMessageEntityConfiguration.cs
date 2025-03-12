using DotNetElements.AppFramework.Abstractions.Outbox;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DotNetElements.AppFramework.SqlServer;

public sealed class OutboxMessageEntityConfiguration : IEntityTypeConfiguration<OutboxMessage>
{
    public void Configure(EntityTypeBuilder<OutboxMessage> builder)
    {
        builder
            .Property(entity => entity.Type)
            .HasMaxLength(255);

        builder
            .Property(entity => entity.Error)
            .HasMaxLength(1024);

        builder
            .Property(Entity => Entity.RetryCount)
            .HasColumnType("tinyint");
    }
}