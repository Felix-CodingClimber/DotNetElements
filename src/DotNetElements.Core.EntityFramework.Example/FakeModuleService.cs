namespace DotNetElements.Core.EntityFramework.Example;

internal sealed class FakeModuleService<TDbContext, TModuleService> : IDisposable
    where TDbContext : DbContext
    where TModuleService : ModuleService<TDbContext>
{
    public TModuleService Service { get; private init; }

    public static FakeModuleService<TDbContext, TModuleService> Create(TDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider)
    {
        return new FakeModuleService<TDbContext, TModuleService>(dbContext, currentUserProvider, timeProvider);
    }

    private readonly TDbContext dbContext;

    private FakeModuleService(TDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider)
    {
        this.dbContext = dbContext;
        Service = (TModuleService)Activator.CreateInstance(typeof(TModuleService), dbContext, currentUserProvider, timeProvider)!;
    }

    public void Dispose()
    {
        dbContext.Dispose();
    }
}
