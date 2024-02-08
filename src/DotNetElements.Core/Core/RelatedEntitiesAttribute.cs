﻿namespace DotNetElements.Core;

[AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
public class RelatedEntitiesAttribute : Attribute
{
	public string[] ReferenceProperties { get; private init; }

	public RelatedEntitiesAttribute(string[] referenceProperties)
	{
		ReferenceProperties = referenceProperties;

	}
}

[AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
public class RelatedEntitiesCollectionsAttribute : Attribute
{
    public string[] ReferenceProperties { get; private init; }

    public RelatedEntitiesCollectionsAttribute(string[] referenceProperties)
    {
        ReferenceProperties = referenceProperties;

    }
}
