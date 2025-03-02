namespace DotNetElements.Core.EntityFramework.Shared;

public interface IHasVersion
{
    Guid Version { get; }
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

    public static abstract object CreateFromData(ImageData data, string AlternateText);
}

// todo why is this not more restrictive?
public interface IMapFromModel<TEditModel, TModel>
{
    public static abstract TEditModel MapFromModel(TModel model);
}

// todo why is this not more restrictive?
public interface ICreateNew<TEditModel>
{
    public static abstract TEditModel Empty();
}