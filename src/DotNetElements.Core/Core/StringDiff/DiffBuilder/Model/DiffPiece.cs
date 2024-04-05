namespace DotNetElements.Core.StringDiff;

public enum ChangeType
{
    Unchanged,
    Deleted,
    Inserted,
    Imaginary,
    Modified
}

public record struct DiffPiece(string? Text, ChangeType Type, int? PositionOld = null, int? PositionNew = null)
{
    public List<DiffPiece> SubPieces { get; private init; } = [];
    public bool IsOldPiece { get; set; }
}