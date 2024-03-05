// Modified version of https://github.com/Chronostasys/Blazor.Cropper
//
// Date of source:           05.03.2024
// Commit version of source: Latest commit 523c2bb on Aug 20, 2023
// 
// Original License:
//
// The MIT License
// 
// Copyright(c) 2020 Chronostasys

namespace DotNetElements.Web.Blazor.ImageCropper;

/// <summary>
/// mock a browserfile from a stream
/// </summary>
public class StreamFile : IBrowserFile
{
    /// <summary>
    /// Build a stream file
    /// </summary>
    /// <param name="stream"></param>
    /// <param name="name"></param>
    /// <param name="contentType"></param>
    public StreamFile(Stream stream, string name = "1.jpg", string contentType = "image/jpg")
    {
        _stream = stream;
        Name = name;
        ContentType = contentType;
    }

    Stream _stream;

    /// <summary>
    /// name
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// not impl
    /// </summary>
    public DateTimeOffset LastModified => throw new NotImplementedException();

    /// <summary>
    /// stream size
    /// </summary>
    public long Size => _stream.Length;

    /// <summary>
    /// content type, should in form of image/xxx
    /// </summary>
    public string ContentType { get; set; }

    /// <summary>
    /// open read stream
    /// </summary>
    /// <param name="maxAllowedSize"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public Stream OpenReadStream(long maxAllowedSize = 512000, CancellationToken cancellationToken = default)
    {
        return _stream;
    }
}