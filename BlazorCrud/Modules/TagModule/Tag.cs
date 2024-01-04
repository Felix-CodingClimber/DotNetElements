using BlazorCrud.Modules.BlogPostModule;

namespace BlazorCrud.Modules.TagModule;

public class Tag : AuditedEntity<Guid>, IUpdatable<EditTagModel>, IRelatedEntity<Tag, Guid>
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

	public void Update(EditTagModel from, IAttachRelatedEntity _)
	{
		ArgumentNullException.ThrowIfNull(from);

		Label = from.Label;
	}

	public static Tag CreateRefById(Guid id)
	{
		return new Tag(id);
	}
}
