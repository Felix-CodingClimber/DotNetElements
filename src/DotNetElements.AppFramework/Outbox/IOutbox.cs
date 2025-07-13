namespace DotNetElements.AppFramework;

public interface IOutbox<TDbContext>
    where TDbContext : DbContext, IDbSetOutbox
{
    void AddMessage<T>(T message);
}
