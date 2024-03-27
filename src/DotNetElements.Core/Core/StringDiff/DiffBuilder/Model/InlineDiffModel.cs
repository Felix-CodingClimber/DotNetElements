namespace DotNetElements.Core.StringDiff;

public record class InlineDiffModel(List<DiffPiece> Lines)
{
    public bool HasDifferences => Lines.Any(x => x.Type != ChangeType.Unchanged);

    public InlineDiffModel() : this([])
    {
    }
}