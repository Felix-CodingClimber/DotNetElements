namespace DotNetElements.Core.StringDiff;

public class CompactDiffBuilder
{
    private readonly bool ignoreWhiteSpace;
    private readonly bool ignoreCase;

    private readonly LineChunker lineChunker;
    private readonly WordChunker wordChunker;

    /// <summary>
    ///     Creates a new instance of a <see cref="CompactDiffBuilder"/>
    /// </summary>
    /// <param name="ignoreWhiteSpace"><see langword="true"/> if ignore the white space; otherwise, <see langword="false"/>.</param>
    /// <param name="ignoreCase"><see langword="true"/> if case-insensitive; otherwise, <see langword="false"/>.</param>
    public CompactDiffBuilder(bool ignoreWhiteSpace = false, bool ignoreCase = false)
    {
        this.ignoreWhiteSpace = ignoreWhiteSpace;
        this.ignoreCase = ignoreCase;

        lineChunker = new LineChunker();
        wordChunker = new WordChunker();
    }

    /// <summary>
    /// Gets the textual diff visualized vertically.
    /// </summary>
    /// <param name="oldText">The old text to diff.</param>
    /// <param name="newText">The new text.</param>
    /// <returns>The diffs result.</returns>
    public CompactDiffModel Diff(string oldText, string newText)
    {
        ArgumentNullException.ThrowIfNull(oldText);
        ArgumentNullException.ThrowIfNull(newText);

        CompactDiffModel model = new();
        DiffResult diffResult = Differ.CreateDiffs(oldText, newText, ignoreWhiteSpace, ignoreCase, lineChunker);
        BuildDiffPieces(diffResult, model.Lines, ignoreWhiteSpace, ignoreCase);

        return model;
    }

    private ChangeType BuildDiffPieces(DiffResult diffResult, List<DiffPiece> pieces, bool ignoreWhiteSpace, bool ignoreCase)
    {
        int aPos = 0;
        int bPos = 0;

        ChangeType changeSummary = ChangeType.Unchanged;

        foreach (DiffBlock diffBlock in diffResult.DiffBlocks)
        {
            while (bPos < diffBlock.InsertStartB && aPos < diffBlock.DeleteStartA)
            {
                pieces.Add(new DiffPiece(diffResult.PiecesOld[aPos], ChangeType.Unchanged, aPos + 1) { IsOldPiece = true });

                aPos++;
                bPos++;
            }

            int i = 0;
            for (; i < Math.Min(diffBlock.DeleteCountA, diffBlock.InsertCountB); i++)
            {
                DiffPiece oldPiece = new(diffResult.PiecesOld[i + diffBlock.DeleteStartA], ChangeType.Deleted, aPos + 1) { IsOldPiece = true };
                DiffPiece newPiece = new(diffResult.PiecesNew[i + diffBlock.InsertStartB], ChangeType.Inserted, bPos + 1);

                ChangeType subChangeSummary = BuildWordDiffPieces(diffResult.PiecesOld[aPos], diffResult.PiecesNew[bPos], oldPiece.SubPieces, newPiece.SubPieces, ignoreWhiteSpace, ignoreCase);
                newPiece.Type = oldPiece.Type = subChangeSummary;

                pieces.Add(oldPiece);
                pieces.Add(newPiece);
                aPos++;
                bPos++;
            }

            if (diffBlock.DeleteCountA > diffBlock.InsertCountB)
            {
                for (; i < diffBlock.DeleteCountA; i++)
                {
                    pieces.Add(new DiffPiece(diffResult.PiecesOld[i + diffBlock.DeleteStartA], ChangeType.Deleted, aPos + 1) { IsOldPiece = true });

                    aPos++;
                }
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

        while (bPos < diffResult.PiecesNew.Length && aPos < diffResult.PiecesOld.Length)
        {
            pieces.Add(new DiffPiece(diffResult.PiecesOld[aPos], ChangeType.Unchanged, aPos + 1) { IsOldPiece = true });

            aPos++;
            bPos++;
        }

        // Consider the whole diff as "modified" if we found any change, otherwise we consider it unchanged
        if (pieces.Any(x => x.Type is ChangeType.Modified or ChangeType.Inserted or ChangeType.Deleted))
            changeSummary = ChangeType.Modified;

        return changeSummary;
    }

    private ChangeType BuildWordDiffPieces(string oldText, string newText, List<DiffPiece> oldPieces, List<DiffPiece> newPieces, bool ignoreWhiteSpace, bool ignoreCase)
    {
        DiffResult diffResult = Differ.CreateDiffs(oldText, newText, ignoreWhiteSpace: ignoreWhiteSpace, ignoreCase, wordChunker);

        return BuildSubPieces(diffResult, oldPieces, newPieces, ignoreWhiteSpace, ignoreCase);
    }

    private static ChangeType BuildSubPieces(DiffResult diffResult, List<DiffPiece> oldPieces, List<DiffPiece> newPieces, bool ignoreWhiteSpace, bool ignoreCase)
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