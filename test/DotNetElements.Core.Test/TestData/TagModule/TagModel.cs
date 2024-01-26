namespace DotNetElements.Core.Test.TestData;

public class TagModel : VersionedModel<Guid>
{
	public string Label { get; private init; }

	public TagModel(Guid id, string label, Guid version) : base(id, version)
	{
		Label = label;
	}

	public override string ToString() => Label;
}

public class EditTagModel : VersionedEditModel<TagModel, Guid>
{
	public string Label { get; set; }

#nullable disable
	public EditTagModel() : base(Guid.NewGuid()) { }
#nullable enable

	public EditTagModel(TagModel tag) : base(tag.Id, tag.Version)
	{
		Label = tag.Label;
	}
}
