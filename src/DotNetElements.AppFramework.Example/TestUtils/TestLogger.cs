namespace DotNetElements.AppFramework.DebugEfCore;

internal enum LogType
{
	DbContext,
	ModuleService,
	ObjectDumpHeader,
	ObjectDump,
	Interceptor,
}

internal record struct LogEvent(LogType LogType, string Message, DateTime Timestamp);

internal static partial class Logger
{
	public static ILogEventStore? Instance;

	public static void LogToConsole(List<LogEvent> logEvents)
	{
		bool previousLogEventHasTrailingNewLine = false;

		foreach (LogEvent logEvent in logEvents.OrderBy(e => e.Timestamp))
		{
			ConsoleColor color = logEvent.LogType switch
			{
				LogType.DbContext => ConsoleColor.White,
				LogType.ModuleService => ConsoleColor.Green,
				LogType.ObjectDumpHeader => ConsoleColor.Yellow,
				LogType.ObjectDump => ConsoleColor.White,
                LogType.Interceptor => ConsoleColor.Cyan,
                _ => ConsoleColor.White,
			};

			bool addEmptyLineBefore = logEvent.LogType switch
			{
				LogType.DbContext => previousLogEventHasTrailingNewLine ? false : true,
				LogType.ModuleService => true,
				LogType.ObjectDumpHeader => true,
				LogType.ObjectDump => false,
				LogType.Interceptor => previousLogEventHasTrailingNewLine ? false : true,
				_ => false,
			};

			bool addEmptyLineAfter = logEvent.LogType switch
			{
				LogType.DbContext => false,
				LogType.ModuleService => true,
				LogType.ObjectDumpHeader => false,
				LogType.ObjectDump => true,
                LogType.Interceptor => false,
                _ => false,
			};

			Console.ForegroundColor = color;

			if (addEmptyLineBefore)
				Console.WriteLine();

			Console.WriteLine(logEvent.Message);

			if (addEmptyLineAfter)
				Console.WriteLine();

            previousLogEventHasTrailingNewLine = addEmptyLineAfter;
		};

		Console.ResetColor();
	}
}
