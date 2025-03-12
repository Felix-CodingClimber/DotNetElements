using System.Text;

namespace DotNetElements.Core.StringDiff;

public class CompactDiffBuilder
{
    private readonly bool ignoreWhiteSpace;
    private readonly bool ignoreCase;
    private readonly int numContextLines;

    private readonly LineChunker lineChunker;
    private readonly WordChunker wordChunker;

    /// <summary>
    ///     Creates a new instance of a <see cref="CompactDiffBuilder"/>
    /// </summary>
    /// <param name="ignoreWhiteSpace"><see langword="true"/> if ignore the white space; otherwise, <see langword="false"/>.</param>
    /// <param name="ignoreCase"><see langword="true"/> if case-insensitive; otherwise, <see langword="false"/>.</param>
    /// <param name="numContextLines">Number of unchanged lines visible before and after a changed line</param>
    public CompactDiffBuilder(bool ignoreWhiteSpace = false, bool ignoreCase = false, int numContextLines = 2)
    {
        this.ignoreWhiteSpace = ignoreWhiteSpace;
        this.ignoreCase = ignoreCase;
        this.numContextLines = numContextLines;

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
        BuildLineDiffPieces(diffResult, model.Lines, ignoreWhiteSpace, ignoreCase);

        return model;
    }

    private ChangeType BuildLineDiffPieces(DiffResult diffResult, List<DiffPiece> pieces, bool ignoreWhiteSpace, bool ignoreCase)
    {
        int aPos = 0;
        int bPos = 0;

        ChangeType changeSummary = ChangeType.Unchanged;

        foreach (DiffBlock diffBlock in diffResult.DiffBlocks)
        {
            int addedLinesUnchanged = 0;
            while (bPos < diffBlock.InsertStartB && aPos < diffBlock.DeleteStartA)
            {
                if (aPos == 0 || addedLinesUnchanged == numContextLines)
                {
                    aPos = Math.Max(diffBlock.DeleteStartA - numContextLines, aPos);
                    bPos = Math.Max(diffBlock.InsertStartB - numContextLines, bPos);
                }

                pieces.Add(new DiffPiece(diffResult.PiecesOld[aPos], ChangeType.Unchanged, PositionOld: aPos + 1, PositionNew: bPos + 1) { IsOldPiece = true });

                addedLinesUnchanged++;
                aPos++;
                bPos++;
            }

            int i = 0;
            for (; i < Math.Min(diffBlock.DeleteCountA, diffBlock.InsertCountB); i++)
            {
                DiffPiece oldPiece = new(diffResult.PiecesOld[i + diffBlock.DeleteStartA], ChangeType.Deleted, PositionOld: aPos + 1) { IsOldPiece = true };
                DiffPiece newPiece = new(diffResult.PiecesNew[i + diffBlock.InsertStartB], ChangeType.Inserted, PositionNew: bPos + 1);

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
                    pieces.Add(new DiffPiece(diffResult.PiecesOld[i + diffBlock.DeleteStartA], ChangeType.Deleted, PositionOld: aPos + 1) { IsOldPiece = true });

                    aPos++;
                }
            }
            else
            {
                for (; i < diffBlock.InsertCountB; i++)
                {
                    pieces.Add(new DiffPiece(diffResult.PiecesNew[i + diffBlock.InsertStartB], ChangeType.Inserted, PositionNew: bPos + 1));

                    bPos++;
                }
            }
        }

        while (bPos < diffResult.PiecesNew.Length && aPos < diffResult.PiecesOld.Length)
        {
            pieces.Add(new DiffPiece(diffResult.PiecesOld[aPos], ChangeType.Unchanged, PositionOld: aPos + 1, PositionNew: bPos + 1) { IsOldPiece = true });

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

        return BuildSubPieces(diffResult, oldPieces, newPieces);
    }

    private static ChangeType BuildSubPieces(DiffResult diffResult, List<DiffPiece> oldPieces, List<DiffPiece> newPieces)
    {
        int aPos = 0;
        int bPos = 0;

        ChangeType changeSummary = ChangeType.Unchanged;
        StringBuilder sbOld = new();
        StringBuilder sbNew = new();

        foreach (DiffBlock diffBlock in diffResult.DiffBlocks)
        {
            sbOld.Clear();
            sbNew.Clear();
            while (bPos < diffBlock.InsertStartB && aPos < diffBlock.DeleteStartA)
            {
                sbOld.Append(diffResult.PiecesOld[aPos]);
                sbNew.Append(diffResult.PiecesNew[bPos]);

                aPos++;
                bPos++;
            }

            if (sbOld.Length > 0)
                oldPieces.Add(new DiffPiece(sbOld.ToString(), ChangeType.Unchanged));
            if (sbNew.Length > 0)
                newPieces.Add(new DiffPiece(sbNew.ToString(), ChangeType.Unchanged));

            int i = 0;
            sbOld.Clear();
            sbNew.Clear();
            for (; i < Math.Min(diffBlock.DeleteCountA, diffBlock.InsertCountB); i++)
            {
                sbOld.Append(diffResult.PiecesOld[i + diffBlock.DeleteStartA]);
                sbNew.Append(diffResult.PiecesNew[i + diffBlock.InsertStartB]);

                aPos++;
                bPos++;
            }

            if (sbOld.Length > 0)
                oldPieces.Add(new DiffPiece(sbOld.ToString(), ChangeType.Deleted));
            if (sbNew.Length > 0)
                newPieces.Add(new DiffPiece(sbNew.ToString(), ChangeType.Inserted));

            if (diffBlock.DeleteCountA > diffBlock.InsertCountB)
            {
                StringBuilder sb = new();
                for (; i < diffBlock.DeleteCountA; i++)
                {
                    sb.Append(diffResult.PiecesOld[i + diffBlock.DeleteStartA]);

                    aPos++;
                }

                if (sb.Length > 0)
                    oldPieces.Add(new DiffPiece(sb.ToString(), ChangeType.Deleted));
            }
            else
            {
                StringBuilder sb = new();
                for (; i < diffBlock.InsertCountB; i++)
                {
                    sb.Append(diffResult.PiecesNew[i + diffBlock.InsertStartB]);

                    bPos++;
                }

                if (sb.Length > 0)
                    newPieces.Add(new DiffPiece(sb.ToString(), ChangeType.Inserted));
            }
        }

        sbOld.Clear();
        sbNew.Clear();
        while (bPos < diffResult.PiecesNew.Length && aPos < diffResult.PiecesOld.Length)
        {
            sbOld.Append(diffResult.PiecesOld[aPos]);
            sbNew.Append(diffResult.PiecesNew[bPos]);

            aPos++;
            bPos++;
        }

        if (sbOld.Length > 0)
            oldPieces.Add(new DiffPiece(sbOld.ToString(), ChangeType.Unchanged));
        if (sbNew.Length > 0)
            newPieces.Add(new DiffPiece(sbNew.ToString(), ChangeType.Unchanged));


        // Consider the whole diff as "modified" if we found any change, otherwise we consider it unchanged
        if (oldPieces.Any(x => x.Type is ChangeType.Modified or ChangeType.Inserted or ChangeType.Deleted))
            changeSummary = ChangeType.Modified;
        else if (newPieces.Any(x => x.Type is ChangeType.Modified or ChangeType.Inserted or ChangeType.Deleted))
            changeSummary = ChangeType.Modified;

        return changeSummary;
    }
}