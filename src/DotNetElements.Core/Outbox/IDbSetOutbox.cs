namespace DotNetElements.Core;

public interface IDbSetOutbox
{
	public DbSet<OutboxMessage> OutboxMessages { get; }
}
