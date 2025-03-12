using System.Diagnostics;

namespace DotNetElements.Core.StringDiff;

internal static class Differ
{
    public static DiffResult CreateDiffs(string oldText, string newText, bool ignoreWhiteSpace, bool ignoreCase, IChunker chunker)
    {
        ArgumentNullException.ThrowIfNull(oldText);
        ArgumentNullException.ThrowIfNull(newText);
        ArgumentNullException.ThrowIfNull(chunker);

        Dictionary<string, int> pieceHash = new(ignoreCase ? StringComparer.OrdinalIgnoreCase : StringComparer.Ordinal);
        List<DiffBlock> lineDiffs = [];

        ModificationData modOld = new(oldText);
        ModificationData modNew = new(newText);

        BuildPieceHashes(pieceHash, modOld, ignoreWhiteSpace, chunker);
        BuildPieceHashes(pieceHash, modNew, ignoreWhiteSpace, chunker);

        BuildModificationData(modOld, modNew);

        int piecesALength = modOld.HashedPieces.Length;
        int piecesBLength = modNew.HashedPieces.Length;
        int posA = 0;
        int posB = 0;

        do
        {
            while (posA < piecesALength
                   && posB < piecesBLength
                   && !modOld.Modifications[posA]
                   && !modNew.Modifications[posB])
            {
                posA++;
                posB++;
            }

            int beginA = posA;
            int beginB = posB;
            for (; posA < piecesALength && modOld.Modifications[posA]; posA++)
                ;

            for (; posB < piecesBLength && modNew.Modifications[posB]; posB++)
                ;

            int deleteCount = posA - beginA;
            int insertCount = posB - beginB;

            if (deleteCount > 0 || insertCount > 0)
                lineDiffs.Add(new DiffBlock(beginA, deleteCount, beginB, insertCount));

        } while (posA < piecesALength && posB < piecesBLength);

        return new DiffResult(modOld.Pieces, modNew.Pieces, lineDiffs);
    }

    private static EditLengthResult CalculateEditLength(int[] a, int startA, int endA, int[] b, int startB, int endB, int[] forwardDiagonal, int[] reverseDiagonal)
    {
        ArgumentNullException.ThrowIfNull(a);
        ArgumentNullException.ThrowIfNull(b);

        if (a.Length == 0 && b.Length == 0)
            return new EditLengthResult();

        int n = endA - startA;
        int m = endB - startB;
        int max = m + n + 1;
        int half = max / 2;
        int delta = n - m;
        bool deltaEven = delta % 2 == 0;
        forwardDiagonal[1 + half] = 0;
        reverseDiagonal[1 + half] = n + 1;

        Log("Comparing strings");
        Log("\t{0} of length {1}", a, a.Length);
        Log("\t{0} of length {1}", b, b.Length);

        for (int d = 0; d <= half; d++)
        {
            Log("\nSearching for a {0}-Path", d);
            // forward D-path
            Log("\tSearching for forward path");
            Edit lastEdit;
            for (int k = -d; k <= d; k += 2)
            {
                Log("\n\t\tSearching diagonal {0}", k);
                int kIndex = k + half;
                int x, y;
                if (k == -d || (k != d && forwardDiagonal[kIndex - 1] < forwardDiagonal[kIndex + 1]))
                {
                    x = forwardDiagonal[kIndex + 1]; // y up move down from previous diagonal
                    lastEdit = Edit.InsertDown;
                    Log("\t\tMoved down from diagonal {0} at ({1},{2}) to ", k + 1, x, (x - (k + 1)));
                }
                else
                {
                    x = forwardDiagonal[kIndex - 1] + 1; // x up move right from previous diagonal
                    lastEdit = Edit.DeleteRight;
                    Log("\t\tMoved right from diagonal {0} at ({1},{2}) to ", k - 1, x - 1, (x - 1 - (k - 1)));
                }

                y = x - k;
                int startX = x;
                int startY = y;
                Log("({0},{1})", x, y);
                while (x < n && y < m && a[x + startA] == b[y + startB])
                {
                    x += 1;
                    y += 1;
                }

                Log("\t\tFollowed snake to ({0},{1})", x, y);

                forwardDiagonal[kIndex] = x;

                if (!deltaEven && k - delta >= -d + 1 && k - delta <= d - 1)
                {
                    int revKIndex = (k - delta) + half;
                    int revX = reverseDiagonal[revKIndex];
                    int revY = revX - k;
                    if (revX <= x && revY <= y)
                    {
                        return new EditLengthResult
                        {
                            EditLength = 2 * d - 1,
                            StartX = startX + startA,
                            StartY = startY + startB,
                            EndX = x + startA,
                            EndY = y + startB,
                            LastEdit = lastEdit
                        };
                    }
                }
            }

            // reverse D-path
            Log("\n\tSearching for a reverse path");
            for (int k = -d; k <= d; k += 2)
            {
                Log("\n\t\tSearching diagonal {0} ({1})", k, k + delta);
                int kIndex = k + half;
                int x, y;
                if (k == -d || (k != d && reverseDiagonal[kIndex + 1] <= reverseDiagonal[kIndex - 1]))
                {
                    x = reverseDiagonal[kIndex + 1] - 1; // move left from k+1 diagonal
                    lastEdit = Edit.DeleteLeft;
                    Log("\t\tMoved left from diagonal {0} at ({1},{2}) to ", k + 1, x + 1, ((x + 1) - (k + 1 + delta)));
                }
                else
                {
                    x = reverseDiagonal[kIndex - 1]; //move up from k-1 diagonal
                    lastEdit = Edit.InsertUp;
                    Log("\t\tMoved up from diagonal {0} at ({1},{2}) to ", k - 1, x, (x - (k - 1 + delta)));
                }

                y = x - (k + delta);

                int endX = x;
                int endY = y;

                Log("({0},{1})", x, y);
                while (x > 0 && y > 0 && a[startA + x - 1] == b[startB + y - 1])
                {
                    x -= 1;
                    y -= 1;
                }

                Log("\t\tFollowed snake to ({0},{1})", x, y);
                reverseDiagonal[kIndex] = x;

                if (deltaEven && k + delta >= -d && k + delta <= d)
                {
                    int forKIndex = (k + delta) + half;
                    int forX = forwardDiagonal[forKIndex];
                    int forY = forX - (k + delta);
                    if (forX >= x && forY >= y)
                    {
                        return new EditLengthResult
                        {
                            EditLength = 2 * d,
                            StartX = x + startA,
                            StartY = y + startB,
                            EndX = endX + startA,
                            EndY = endY + startB,
                            LastEdit = lastEdit
                        };
                    }
                }
            }
        }

        throw new Exception("Should never get here");
    }

    private static void BuildModificationData(ModificationData a, ModificationData b)
    {
        int n = a.HashedPieces.Length;
        int m = b.HashedPieces.Length;
        int max = m + n + 1;
        var forwardDiagonal = new int[max + 1];
        var reverseDiagonal = new int[max + 1];

        BuildModificationData(a, 0, n, b, 0, m, forwardDiagonal, reverseDiagonal);
    }

    private static void BuildModificationData(
        ModificationData A,
        int startA,
        int endA,
        ModificationData B,
        int startB,
        int endB,
        int[] forwardDiagonal,
        int[] reverseDiagonal)
    {
        while (startA < endA && startB < endB && A.HashedPieces[startA].Equals(B.HashedPieces[startB]))
        {
            startA++;
            startB++;
        }

        while (startA < endA && startB < endB && A.HashedPieces[endA - 1].Equals(B.HashedPieces[endB - 1]))
        {
            endA--;
            endB--;
        }

        int aLength = endA - startA;
        int bLength = endB - startB;
        if (aLength > 0 && bLength > 0)
        {
            EditLengthResult result = CalculateEditLength(A.HashedPieces, startA, endA, B.HashedPieces, startB, endB, forwardDiagonal, reverseDiagonal);
            if (result.EditLength <= 0)
                return;

            if (result.LastEdit == Edit.DeleteRight && result.StartX - 1 > startA)
                A.Modifications[--result.StartX] = true;
            else if (result.LastEdit == Edit.InsertDown && result.StartY - 1 > startB)
                B.Modifications[--result.StartY] = true;
            else if (result.LastEdit == Edit.DeleteLeft && result.EndX < endA)
                A.Modifications[result.EndX++] = true;
            else if (result.LastEdit == Edit.InsertUp && result.EndY < endB)
                B.Modifications[result.EndY++] = true;

            BuildModificationData(A, startA, result.StartX, B, startB, result.StartY, forwardDiagonal, reverseDiagonal);
            BuildModificationData(A, result.EndX, endA, B, result.EndY, endB, forwardDiagonal, reverseDiagonal);
        }
        else if (aLength > 0)
        {
            for (int i = startA; i < endA; i++)
                A.Modifications[i] = true;
        }
        else if (bLength > 0)
        {
            for (int i = startB; i < endB; i++)
                B.Modifications[i] = true;
        }
    }

    private static void BuildPieceHashes(Dictionary<string, int> pieceHash, ModificationData data, bool ignoreWhitespace, IChunker chunker)
    {
        string[] pieces = string.IsNullOrEmpty(data.RawData) ? [] : chunker.Chunk(data.RawData);
        data.Pieces = pieces;

        int numPieces = pieces.Length;
        data.HashedPieces = new int[numPieces];
        data.Modifications = new bool[numPieces];

        for (int i = 0; i < numPieces; i++)
        {
            string piece = pieces[i];
            if (ignoreWhitespace)
                piece = piece.Trim();

            if (pieceHash.TryGetValue(piece, out int value))
            {
                data.HashedPieces[i] = value;
            }
            else
            {
                data.HashedPieces[i] = pieceHash.Count;
                pieceHash[piece] = pieceHash.Count;
            }
        }
    }

    [Conditional("Debug")]
    private static void Log(string format, params object[] args)
    {
        Debug.WriteLine(string.Format(format, args));
    }
}