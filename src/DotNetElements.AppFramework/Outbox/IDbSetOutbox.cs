using DotNetElements.AppFramework.Abstractions.Outbox;

namespace DotNetElements.AppFramework;

public interface IDbSetOutbox
{
    public DbSet<OutboxMessage> OutboxMessages { get; }
}
