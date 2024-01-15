namespace DotNetElements.Core;

public interface IHasKey<TKey>
	where TKey : notnull
{
	TKey Id { get; }

	bool HasKey => !Id.Equals(default(TKey));
}

public interface IHasVersionReadOnly
{
	Guid Version { get; }
}

// todo implement code analyzer to detect missing attribute
// - https://stackoverflow.com/questions/74377235/how-can-i-detect-missing-attributes-on-a-method-with-roslyn-code-analyser
// - https://medium.com/@niteshsinghal85/custom-code-analyzer-to-detect-usage-of-allowanonymous-attribute-in-c-a225a81ab2b4

/// <summary>
/// To make use of Ef Cores concurrency check, add a <see cref="ConcurrencyCheckAttribute"/> to the property.
/// </summary>
public interface IHasVersion : IHasVersionReadOnly
{
	Guid IHasVersionReadOnly.Version => Version;

	new Guid Version { get; set; }
}
