using DotNetElements.Core.Result;
using System.Runtime.CompilerServices;
using System.Text.Json;

namespace DotNetElements.Core.EntityFramework.Example;

internal static class ObjectExtensions
{
	private readonly static JsonSerializerOptions jsonOptions = new()
	{
		WriteIndented = true
	};

	public static TObject Dump<TObject>(this TObject obj, string? message = null, [CallerArgumentExpression(nameof(obj))] string? caller = null)
	{
		string? objectDump;

		if (obj is ErrorResult<CrudError> crudResult)
		{
			object? value = typeof(TObject).GetField("Value", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.GetValue(obj);

			if (value is not null)
				objectDump = GetObjectAsJson(new { Result = crudResult.IsOk ? "Ok" : "Fail", Value = value });
			else
				objectDump = GetObjectAsJson(new { Result = crudResult.IsOk ? "Ok" : "Fail" });
		}
		else
		{
			objectDump = GetObjectAsJson(obj);
		}

		string cleansedObjectType = GetObjectTypeCleansed<TObject>();

		Logger.Instance?.Log(LogType.ObjectDumpHeader, $"{message} {caller} (TypeOf: {cleansedObjectType})");
		Logger.Instance?.Log(LogType.ObjectDump, objectDump);

		return obj;
	}

	private static string GetObjectTypeCleansed<TObject>()
	{
		Type objectType = typeof(TObject);

		string objectTypeCleansed = objectType.Name;

		if (objectType.IsGenericType)
		{
			objectTypeCleansed = objectTypeCleansed.Split('`')[0];
			objectTypeCleansed += "<";
			objectTypeCleansed += string.Join(", ", objectType.GetGenericArguments().First().Name);
			objectTypeCleansed += ">";
		}

		return objectTypeCleansed;
	}

	private static string GetObjectAsJson<TObject>(TObject obj)
	{
		return JsonSerializer.Serialize(obj, jsonOptions);
	}
}
