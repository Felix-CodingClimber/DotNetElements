using DotNetElements.AppFramework.Abstractions.Outbox;

namespace DotNetElements.AppFramework.Outbox;

public interface IDbSetOutbox
{
	public DbSet<OutboxMessage> OutboxMessages { get; }
}
