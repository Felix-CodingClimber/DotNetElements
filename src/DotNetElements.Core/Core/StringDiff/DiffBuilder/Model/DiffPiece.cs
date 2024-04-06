using System.Text.Json.Serialization;

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
    public bool IsOldPiece { get; init; }

    [JsonConstructor]
    public DiffPiece(string? text, ChangeType type, int? positionOld, int? positionNew, List<DiffPiece> subPieces, bool isOldPiece) :
        this(text, type, positionOld, positionNew)
    {
        SubPieces = subPieces;
        IsOldPiece = isOldPiece;
    }
}