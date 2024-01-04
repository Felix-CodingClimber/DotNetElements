namespace BlazorCrud.Core;

[AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
public class RelatedEntitiesAttribute : Attribute
{
	public string[] ReferenceProperties { get; private init; }

	public RelatedEntitiesAttribute(string[] referenceProperties)
	{
		ReferenceProperties = referenceProperties;

	}
}
