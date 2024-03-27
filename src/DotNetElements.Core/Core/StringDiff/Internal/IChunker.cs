namespace DotNetElements.Core.StringDiff;

/// <summary>
/// Responsible for how to turn the document into pieces
/// </summary>
internal interface IChunker
{
    /// <summary>
    /// Divide text into sub-parts
    /// </summary>
    string[] Chunk(string text);
}