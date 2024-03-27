namespace DotNetElements.Core.StringDiff;

/// <summary>
/// A model which represents differences between to texts to be shown side by side
/// </summary>
public class SideBySideDiffModel
{
    public InlineDiffModel OldText { get; }
    public InlineDiffModel NewText { get; }

    public SideBySideDiffModel()
    {
        OldText = new InlineDiffModel();
        NewText = new InlineDiffModel();
    }
}