namespace DotNetElements.ScribanEditor;

public sealed record class ScribanVariableDefinition
{
	public required string Name { get; init; }
	public ScribanVariableDefinition[] ChildVars { get; init; } = [];
}
