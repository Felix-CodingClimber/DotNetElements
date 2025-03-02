using System.Text.Json;

namespace DotNetElements.Core.EntityFramework.Example;

internal static class ObjectExtensions
{
    private readonly static JsonSerializerOptions jsonOptions = new() { WriteIndented = true };

    public static TObject Dump<TObject>(this TObject obj)
    {
        string json = JsonSerializer.Serialize(obj, jsonOptions);

        Console.WriteLine(json);

        return obj;
    }
}
