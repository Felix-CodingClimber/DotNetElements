namespace DotNetElements.AppFramework.Outbox;

public interface IOutbox<TDbContext>
	where TDbContext : DbContext, IDbSetOutbox
{
	Task AddMessageAsync<T>(T message);
}
