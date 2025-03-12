namespace DotNetElements.Core.StringDiff;

/// <summary>
/// The result of diffing two pieces of text
/// </summary>
/// <param name="PiecesOld">The chunked pieces of the old text</param>
/// <param name="PiecesNew">The chunked pieces of the new text</param>
/// <param name="DiffBlocks">A collection of DiffBlocks which details deletions and insertions</param>
internal record struct DiffResult(string[] PiecesOld, string[] PiecesNew, IList<DiffBlock> DiffBlocks);