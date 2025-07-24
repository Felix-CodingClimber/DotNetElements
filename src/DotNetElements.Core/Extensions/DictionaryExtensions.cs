namespace DotNetElements.Core.Extensions;

public static class DictionaryExtensions
{
    public static TValue GetOrCreate<TKey, TValue>(this IDictionary<TKey, TValue> dictionary, TKey key)
        where TValue : new()
    {
        if (!dictionary.TryGetValue(key, out TValue? value))
        {
            value = new TValue();
            dictionary.Add(key, value);
        }

        return value;
    }

    public static TValue GetOrCreate<TKey, TValue>(this IDictionary<TKey, TValue> dictionary, TKey key, TValue defaultValue)
    {
        if (!dictionary.TryGetValue(key, out TValue? value))
        {
            dictionary.Add(key, defaultValue);
            return defaultValue;
        }

        return value;
    }
}
