namespace DotNetElements.Core;

public interface IHasKey<TKey>
    where TKey : notnull, IEquatable<TKey>
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

public interface IMapFromModel<TEditModel, TModel>
{
    public static abstract TEditModel MapFromModel(TModel model);
}

public interface ICreateNew<TEditModel>
{
    public static abstract TEditModel Empty();
}

public interface IImage : IModel<Guid>
{
    public string AlternateText { get; init; }
    public string FileName { get; init; }
    public string StoredFileName { get; init; }
}

public interface IEditImage : IModel<Guid>
{
    public string AlternateText { get; set; }
    public string FileName { get; set; }
    public string StoredFileName { get; set; } // todo check if needed
    public byte[]? Data { get; set; }

    public string? GetBase64Preview() => Data is not null ? $"data:Image/*;base64,{Convert.ToBase64String(Data)}" : null;

    public static abstract IEditImage CreateFromData(ImageData data, string AlternateText);
}