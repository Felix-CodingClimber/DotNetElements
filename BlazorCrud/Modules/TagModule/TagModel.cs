namespace BlazorCrud.Modules.TagModule;

public record class TagModel(Guid Id, string Label) : Model<Guid>(Id)
{
	public override string ToString() => Label;
}

public record class EditTagModel
{
	public Guid Id { get; private init; }
	public string Label { get; set; }

#nullable disable
	public EditTagModel() { }
#nullable enable

	public EditTagModel(TagModel tag)
	{
		Id = tag.Id;
		Label = tag.Label;
	}
}
