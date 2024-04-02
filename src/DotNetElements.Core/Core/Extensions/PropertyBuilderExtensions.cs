using System.Text.Json;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DotNetElements.Core.Extensions;

public static class PropertyBuilderExtensions
{
    public static PropertyBuilder<T> HasJsonConversion<T>(this PropertyBuilder<T> propertyBuilder) where T : class, new()
    {
        JsonSerializerOptions options = new()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true, // todo check if we want to make that a parameter (might make sense to only use it in debug/test builds)
            AllowTrailingCommas = true,
            PropertyNameCaseInsensitive = true
        };

        ValueConverter<T, string> converter = new ValueConverter<T, string>
        (
            value => JsonSerializer.Serialize(value, options),
            value => JsonSerializer.Deserialize<T>(value, options) ?? new T()
        );

        ValueComparer<T> comparer = new ValueComparer<T>
        (
            (valueA, valueB) => JsonSerializer.Serialize(valueA, options) == JsonSerializer.Serialize(valueB, options),
            value => value == null ? 0 : JsonSerializer.Serialize(value, options).GetHashCode(),
            value => JsonSerializer.Deserialize<T>(JsonSerializer.Serialize(value, options), options)
        );

        propertyBuilder.HasConversion(converter);
        propertyBuilder.Metadata.SetValueConverter(converter);
        propertyBuilder.Metadata.SetValueComparer(comparer);
        propertyBuilder.HasColumnType("nvarchar(max)");

        return propertyBuilder;
    }
}
