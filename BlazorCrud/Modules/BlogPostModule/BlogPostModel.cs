using BlazorCrud.Modules.TagModule;

namespace BlazorCrud.Modules.BlogPostModule;

public record class BlogPostModel(Guid Id, string Title, IReadOnlyList<TagModel> Tags);

public record class EditBlogPostModel
{
	public Guid Id { get; private init; }
	public string Title { get; set; }
	public List<TagModel> Tags { get; set; }

#nullable disable
	public EditBlogPostModel() { }
#nullable enable

	public EditBlogPostModel(BlogPost blogPost)
	{
		Id = blogPost.Id;
		Title = blogPost.Title;
		Tags = new List<TagModel>(blogPost.Tags.Select(tag => tag.MapToModel()));
	}
}
