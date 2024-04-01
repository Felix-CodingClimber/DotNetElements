namespace DotNetElements.Core.StringDiff;

/// <summary>
/// A model which represents differences between to texts to be shown one line after another
/// </summary>
/// <param name="Lines"></param>
public record class CompactDiffModel(List<DiffPiece> Lines)
{
    public bool HasDifferences => Lines.Any(x => x.Type != ChangeType.Unchanged);

    public CompactDiffModel() : this([])
    {
    }
}