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

// todo needed for on update?
//[AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
//public class RelatedEntitiesCollectionsAttribute : Attribute
//{
//    public string[] ReferenceProperties { get; private init; }

//    public RelatedEntitiesCollectionsAttribute(string[] referenceProperties)
//    {
//        ReferenceProperties = referenceProperties;

//    }
//}
