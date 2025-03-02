namespace DotNetElements.Core.EntityFramework.Shared;

public abstract record ModelData(string FileName, byte[] Data);

public sealed record ImageData(string FileName, byte[] Data) : ModelData(FileName, Data);
