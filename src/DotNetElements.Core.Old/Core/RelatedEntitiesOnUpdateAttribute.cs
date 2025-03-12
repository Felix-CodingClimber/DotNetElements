namespace DotNetElements.Core;

[AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
public class RelatedEntitiesOnUpdateAttribute : Attribute
{
	public string[] ReferenceProperties { get; private init; }

	public RelatedEntitiesOnUpdateAttribute(string[] referenceProperties)
	{
		ReferenceProperties = referenceProperties;

	}
}
