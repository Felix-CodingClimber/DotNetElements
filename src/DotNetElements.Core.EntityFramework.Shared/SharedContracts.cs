namespace DotNetElements.Core.EntityFramework.Shared;

public interface IHasKey<TKey>
    where TKey : notnull, IEquatable<TKey>
{
    TKey Id { get; }

    bool HasKey => !Id.Equals(default);
}
