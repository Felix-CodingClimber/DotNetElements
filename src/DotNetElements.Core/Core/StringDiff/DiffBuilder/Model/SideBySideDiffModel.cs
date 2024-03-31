namespace DotNetElements.Core.StringDiff;

/// <summary>
/// A model which represents differences between to texts to be shown side by side
/// </summary>
/// <param name="OldText"></param>
/// <param name="NewText"></param>
public record SideBySideDiffModel(InlineDiffModel OldText, InlineDiffModel NewText)
{
	public SideBySideDiffModel() : this(new InlineDiffModel(), new InlineDiffModel())
	{
	}
}