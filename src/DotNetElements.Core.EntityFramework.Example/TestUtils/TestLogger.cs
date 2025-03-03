namespace DotNetElements.Core.EntityFramework.Example;

internal enum LogType
{
	DbContext,
	ModuleService,
	ObjectDumpHeader,
	ObjectDump,
}

internal record struct LogEvent(LogType LogType, string Message, DateTime Timestamp);

internal static partial class Logger
{
	public static ILogEventStore? Instance;

	public static void LogToConsole(List<LogEvent> logEvents)
	{
		LogEvent? previousLogEvent = null;

		foreach (LogEvent logEvent in logEvents.OrderBy(e => e.Timestamp))
		{
			ConsoleColor color = logEvent.LogType switch
			{
				LogType.DbContext => ConsoleColor.White,
				LogType.ModuleService => ConsoleColor.Green,
				LogType.ObjectDumpHeader => ConsoleColor.Yellow,
				LogType.ObjectDump => ConsoleColor.White,
				_ => ConsoleColor.White,
			};

			bool addEmptyLineBefore = logEvent.LogType switch
			{
				LogType.DbContext => false,
				LogType.ModuleService => true,
				LogType.ObjectDumpHeader => true,
				LogType.ObjectDump => false,
				_ => false,
			};

			// Check if the current logEvent is DbContext and the next logEvent is also DbContext
			if (logEvent.LogType is LogType.DbContext && previousLogEvent?.LogType is LogType.DbContext)
				addEmptyLineBefore = true;

			bool addEmptyLineAfter = logEvent.LogType switch
			{
				LogType.DbContext => false,
				LogType.ModuleService => true,
				LogType.ObjectDumpHeader => false,
				LogType.ObjectDump => true,
				_ => false,
			};

			Console.ForegroundColor = color;

			if (addEmptyLineBefore)
				Console.WriteLine();

			Console.WriteLine(logEvent.Message);

			if (addEmptyLineAfter)
				Console.WriteLine();

			previousLogEvent = logEvent;
		};

		Console.ResetColor();
	}
}
