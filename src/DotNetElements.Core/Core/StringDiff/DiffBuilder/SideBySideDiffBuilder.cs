namespace DotNetElements.Core.StringDiff;

public class SideBySideDiffBuilder
{
    private delegate ChangeType PieceBuilder(string oldText, string newText, List<DiffPiece> oldPieces, List<DiffPiece> newPieces, bool ignoreWhitespace, bool ignoreCase);

    private readonly bool ignoreWhiteSpace;
    private readonly bool ignoreCase;

    private readonly LineChunker lineChunker;
    private readonly WordChunker wordChunker;

    /// <summary>
    ///     Creates a new instance of a <see cref="SideBySideDiffBuilder"/>
    /// </summary>
    /// <param name="ignoreWhiteSpace"><see langword="true"/> if ignore the white space; otherwise, <see langword="false"/>.</param>
    /// <param name="ignoreCase"><see langword="true"/> if case-insensitive; otherwise, <see langword="false"/>.</param>
    public SideBySideDiffBuilder(bool ignoreWhiteSpace = false, bool ignoreCase = false)
    {
        this.ignoreWhiteSpace = ignoreWhiteSpace;
        this.ignoreCase = ignoreCase;

        lineChunker = new LineChunker();
        wordChunker = new WordChunker();
    }

    /// <summary>
    /// Gets the side-by-side textual diffs.
    /// </summary>
    /// <param name="oldText">The old text to diff.</param>
    /// <param name="newText">The new text.</param>
    /// <returns>The diffs result.</returns>
    public SideBySideDiffModel Diff(string oldText, string newText)
    {
        ArgumentNullException.ThrowIfNull(oldText);
        ArgumentNullException.ThrowIfNull(newText);

        SideBySideDiffModel model = new();
        DiffResult diffResult = Differ.CreateDiffs(oldText, newText, ignoreWhiteSpace, ignoreCase, lineChunker);
        BuildDiffPieces(diffResult, model.OldText.Lines, model.NewText.Lines, BuildWordDiffPieces, ignoreWhiteSpace, ignoreCase);

        return model;
    }

    private ChangeType BuildWordDiffPieces(string oldText, string newText, List<DiffPiece> oldPieces, List<DiffPiece> newPieces, bool ignoreWhiteSpace, bool ignoreCase)
    {
        DiffResult diffResult = Differ.CreateDiffs(oldText, newText, ignoreWhiteSpace: ignoreWhiteSpace, ignoreCase, wordChunker);

        return BuildDiffPieces(diffResult, oldPieces, newPieces, subPieceBuilder: null, ignoreWhiteSpace, ignoreCase);
    }

    private static ChangeType BuildDiffPieces(DiffResult diffResult, List<DiffPiece> oldPieces, List<DiffPiece> newPieces, PieceBuilder? subPieceBuilder, bool ignoreWhiteSpace, bool ignoreCase)
    {
        int aPos = 0;
        int bPos = 0;

        ChangeType changeSummary = ChangeType.Unchanged;

        foreach (DiffBlock diffBlock in diffResult.DiffBlocks)
        {
            while (bPos < diffBlock.InsertStartB && aPos < diffBlock.DeleteStartA)
            {
                oldPieces.Add(new DiffPiece(diffResult.PiecesOld[aPos], ChangeType.Unchanged, aPos + 1));
                newPieces.Add(new DiffPiece(diffResult.PiecesNew[bPos], ChangeType.Unchanged, bPos + 1));
                aPos++;
                bPos++;
            }

            int i = 0;
            for (; i < Math.Min(diffBlock.DeleteCountA, diffBlock.InsertCountB); i++)
            {
                DiffPiece oldPiece = new(diffResult.PiecesOld[i + diffBlock.DeleteStartA], ChangeType.Deleted, aPos + 1);
                DiffPiece newPiece = new(diffResult.PiecesNew[i + diffBlock.InsertStartB], ChangeType.Inserted, bPos + 1);

                if (subPieceBuilder is not null)
                {
                    ChangeType subChangeSummary = subPieceBuilder(diffResult.PiecesOld[aPos], diffResult.PiecesNew[bPos], oldPiece.SubPieces, newPiece.SubPieces, ignoreWhiteSpace, ignoreCase);
                    newPiece.Type = oldPiece.Type = subChangeSummary;
                }

                oldPieces.Add(oldPiece);
                newPieces.Add(newPiece);
                aPos++;
                bPos++;
            }

            if (diffBlock.DeleteCountA > diffBlock.InsertCountB)
            {
                for (; i < diffBlock.DeleteCountA; i++)
                {
                    oldPieces.Add(new DiffPiece(diffResult.PiecesOld[i + diffBlock.DeleteStartA], ChangeType.Deleted, aPos + 1));
                    newPieces.Add(new DiffPiece());
                    aPos++;
                }
            }
            else
            {
                for (; i < diffBlock.InsertCountB; i++)
                {
                    newPieces.Add(new DiffPiece(diffResult.PiecesNew[i + diffBlock.InsertStartB], ChangeType.Inserted, bPos + 1));
                    oldPieces.Add(new DiffPiece());
                    bPos++;
                }
            }
        }

        while (bPos < diffResult.PiecesNew.Length && aPos < diffResult.PiecesOld.Length)
        {
            oldPieces.Add(new DiffPiece(diffResult.PiecesOld[aPos], ChangeType.Unchanged, aPos + 1));
            newPieces.Add(new DiffPiece(diffResult.PiecesNew[bPos], ChangeType.Unchanged, bPos + 1));
            aPos++;
            bPos++;
        }

        // Consider the whole diff as "modified" if we found any change, otherwise we consider it unchanged
        if (oldPieces.Any(x => x.Type is ChangeType.Modified or ChangeType.Inserted or ChangeType.Deleted))
            changeSummary = ChangeType.Modified;
        else if (newPieces.Any(x => x.Type is ChangeType.Modified or ChangeType.Inserted or ChangeType.Deleted))
            changeSummary = ChangeType.Modified;

        return changeSummary;
    }
}