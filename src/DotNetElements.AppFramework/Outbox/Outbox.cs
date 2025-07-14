namespace DotNetElements.AppFramework.Outbox;

public sealed class Outbox<TDbContext> : IOutbox<TDbContext>
	where TDbContext : DbContext, IDbSetOutbox
{
	private readonly TDbContext dbContext;

	public Outbox(TDbContext dbContext)
	{
		this.dbContext = dbContext;
	}

	public async Task AddMessageAsync<T>(T message)
	{
		dbContext.AddMessage(message);

		await dbContext.SaveChangesAsync();
	}
}
