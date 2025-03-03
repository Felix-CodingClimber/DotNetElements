namespace DotNetElements.Core.EntityFramework.Example;

internal interface ILogEventStore
{
	public void Log(LogType LogType, string message);
}

internal sealed class FakeModuleService<TDbContext, TModuleService> : IDisposable, ILogEventStore
	where TDbContext : DbContext, IFakeDbContext
	where TModuleService : ModuleService<TDbContext>
{
	public TModuleService Service { get; private init; }

	private readonly List<LogEvent> logEvents = [];

	private readonly string? logContext;

	public static FakeModuleService<TDbContext, TModuleService> Create(TDbContext dbContext, string? logContext)
	{
		return new FakeModuleService<TDbContext, TModuleService>(dbContext, logContext);
	}

	private readonly TDbContext dbContext;

	private FakeModuleService(TDbContext dbContext, string? logContext)
	{
		this.dbContext = dbContext;
		this.dbContext.LogAction = LogFromDbContext;
		this.logContext = logContext;

		Service = (TModuleService)Activator.CreateInstance(typeof(TModuleService), dbContext)!;

		logEvents.Add(new LogEvent(LogType.ModuleService, $"Started ModuleService operations {(logContext is null ? "" : $"<{logContext}>")} (TypeOf: {typeof(TModuleService).Name})", DateTime.Now));

		Logger.Instance = this;
	}

	public void Dispose()
	{
		dbContext.Dispose();

		logEvents.Add(new LogEvent(LogType.ModuleService, $"Finished ModuleService operations {(logContext is null ? "" : $"<{logContext}>")} (TypeOf: {typeof(TModuleService).Name})", DateTime.Now));

		Logger.Instance = null;

		Logger.LogToConsole(logEvents);
	}

	public void Log(LogType LogType, string message)
	{
		logEvents.Add(new LogEvent(LogType, message, DateTime.Now));
	}

	private void LogFromDbContext(string message)
	{
		logEvents.Add(new LogEvent(LogType.DbContext, message, DateTime.Now));
	}
}
