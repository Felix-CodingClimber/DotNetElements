namespace DotNetElements.AppFramework.Abstractions;

public interface IHasKey<TKey>
    where TKey : notnull, IEquatable<TKey>
{
    TKey Id { get; }

    bool HasKey => !Id.Equals(default);
}
