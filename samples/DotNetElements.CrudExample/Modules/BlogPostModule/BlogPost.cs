using DotNetElements.CrudExample.Modules.TagModule;

namespace DotNetElements.CrudExample.Modules.BlogPostModule;

[RelatedEntities([nameof(Tags)])]
public class BlogPost : AuditedEntity<Guid>, IUpdatable<EditBlogPostModel>, IHasVersion
{
	[SQLStringColumn(Length = 256)]
	public string Title { get; private set; }

	private List<Tag> tags = default!;

	[BackingField(nameof(tags))]
	public IReadOnlyList<Tag> Tags => tags;

	[ConcurrencyCheck]
	public Guid Version { get; set; }

	public BlogPost(string title, List<Tag> tags)
	{
		Title = title;
		this.tags = tags;
	}

	public BlogPost(Guid id, string title, List<Tag> tags, Guid version)
	{
		Id = id;
		Title = title;
		this.tags = tags;
		Version = version;
	}

#nullable disable
	private BlogPost() { }
#nullable enable

	public void Update(EditBlogPostModel from, IAttachRelatedEntity attachRelatedEntity)
	{
		ArgumentNullException.ThrowIfNull(from);

		Title = from.Title;

		EntityHelper.UpdateRelatedEntities<Tag, TagModel, Guid>(tags, from.Tags, attachRelatedEntity);
	}
}
