using BlazorCrud.Modules.BlogPostModule;

namespace BlazorCrud.Modules.TagModule;

public class Tag : AuditedEntity<Guid>, IUpdatableFromModel<EditTagModel>
{
	[SQLStringColumn(Length = 256)]
	public string Label { get; private set; }

	private readonly List<BlogPost> blogPosts = default!;

	[BackingField(nameof(blogPosts))]
	public IReadOnlyList<BlogPost> BlogPosts => blogPosts;

	public Tag(string label)
	{
		Label = label;
	}

	public Tag(Guid id, string label)
	{
		Id = id;
		Label = label;
	}

#nullable disable
	public Tag(Guid id)
	{
		Id = id;
	}

	private Tag() { }
#nullable enable

	public void Update(EditTagModel from)
	{
		ArgumentNullException.ThrowIfNull(from);

		Label = from.Label;
	}
}
