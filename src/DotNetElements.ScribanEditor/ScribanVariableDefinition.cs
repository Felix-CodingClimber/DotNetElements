namespace DotNetElements.ScribanEditor;

public sealed record class ScribanVariableDefinition
{
	/// <summary>
	/// The name of the variable as it appears in Scriban templates.
	/// </summary>
	public required string Name { get; init; }

	/// <summary>
	/// Simple property names that are accessible on this variable (e.g., "Value", "Label").
	/// Properties are accessible as variable.PropertyName (e.g., FirstName.Value, FirstName.Label).
	/// </summary>
	public string[] Properties { get; init; } = [];

	/// <summary>
	/// The child variables of this variable.
	/// They are either properties of an object or elements of a collection.
	/// Based on FlattenChildren and IsLoopable, they may be accessible directly and through loop iteration variables.
	/// </summary>
	public ScribanVariableDefinition[] ChildVars { get; init; } = [];

	/// <summary>
	/// When true AND IsLoopable is true, child variables are accessible both directly 
	/// (e.g., vars.PreferredOptions.OptionA) and through loop iteration.
	/// When false AND IsLoopable is true, child variables are ONLY accessible through loop iteration.
	/// </summary>
	public bool FlattenChildren { get; set; }

	/// <summary>
	/// When true, this variable can be used as a loop collection.
	/// Child properties become accessible through loop iteration variables.
	/// </summary>
	public bool IsLoopable { get; set; }
}
