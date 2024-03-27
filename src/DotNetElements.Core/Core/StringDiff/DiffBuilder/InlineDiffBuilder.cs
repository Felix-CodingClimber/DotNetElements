namespace DotNetElements.Core.StringDiff;

public class InlineDiffBuilder
{
    private readonly bool ignoreWhiteSpace;
    private readonly bool ignoreCase;

    private readonly LineChunker chunker;

    /// <summary>
    ///     Creates a new instance of a <see cref="InlineDiffBuilder"/>
    /// </summary>
    /// <param name="ignoreWhiteSpace"><see langword="true"/> if ignore the white space; otherwise, <see langword="false"/>.</param>
    /// <param name="ignoreCase"><see langword="true"/> if case-insensitive; otherwise, <see langword="false"/>.</param>
    public InlineDiffBuilder(bool ignoreWhiteSpace = true, bool ignoreCase = false)
    {
        this.ignoreWhiteSpace = ignoreWhiteSpace;
        this.ignoreCase = ignoreCase;

        chunker = new LineChunker();
    }

    /// <summary>
    /// Gets the inline textual diffs.
    /// </summary>
    /// <param name="differ">The differ instance.</param>
    /// <param name="oldText">The old text to diff.</param>
    /// <param name="newText">The new text.</param>
    /// <param name="ignoreWhiteSpace"><see langword="true"/> if ignore the white space; otherwise, <see langword="false"/>.</param>
    /// <param name="ignoreCase"><see langword="true"/> if case-insensitive; otherwise, <see langword="false"/>.</param>
    /// <param name="chunker">The chunker.</param>
    /// <returns>The diffs result.</returns>
    public InlineDiffModel Diff(string oldText, string newText)
    {
        ArgumentNullException.ThrowIfNull(oldText);
        ArgumentNullException.ThrowIfNull(newText);

        InlineDiffModel model = new InlineDiffModel();
        DiffResult diffResult = Differ.CreateDiffs(oldText, newText, ignoreWhiteSpace, ignoreCase, chunker);
        BuildDiffPieces(diffResult, model.Lines);
        
        return model;
    }

    private static void BuildDiffPieces(DiffResult diffResult, List<DiffPiece> pieces)
    {
        int bPos = 0;

        foreach (var diffBlock in diffResult.DiffBlocks)
        {
            for (; bPos < diffBlock.InsertStartB; bPos++)
                pieces.Add(new DiffPiece(diffResult.PiecesNew[bPos], ChangeType.Unchanged, bPos + 1));

            int i = 0;
            for (; i < Math.Min(diffBlock.DeleteCountA, diffBlock.InsertCountB); i++)
                pieces.Add(new DiffPiece(diffResult.PiecesOld[i + diffBlock.DeleteStartA], ChangeType.Deleted));

            for (i = 0; i < Math.Min(diffBlock.DeleteCountA, diffBlock.InsertCountB); i++)
            {
                pieces.Add(new DiffPiece(diffResult.PiecesNew[i + diffBlock.InsertStartB], ChangeType.Inserted, bPos + 1));
                bPos++;
            }

            if (diffBlock.DeleteCountA > diffBlock.InsertCountB)
            {
                for (; i < diffBlock.DeleteCountA; i++)
                    pieces.Add(new DiffPiece(diffResult.PiecesOld[i + diffBlock.DeleteStartA], ChangeType.Deleted));
            }
            else
            {
                for (; i < diffBlock.InsertCountB; i++)
                {
                    pieces.Add(new DiffPiece(diffResult.PiecesNew[i + diffBlock.InsertStartB], ChangeType.Inserted, bPos + 1));
                    bPos++;
                }
            }
        }

        for (; bPos < diffResult.PiecesNew.Length; bPos++)
            pieces.Add(new DiffPiece(diffResult.PiecesNew[bPos], ChangeType.Unchanged, bPos + 1));
    }
}
