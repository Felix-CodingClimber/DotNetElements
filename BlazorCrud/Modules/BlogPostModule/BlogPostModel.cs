using BlazorCrud.Modules.TagModule;

namespace BlazorCrud.Modules.BlogPostModule;

public record class BlogPostModel(Guid Id, string Title, IReadOnlyList<TagModel> Tags) : Model<Guid>(Id);

public record class EditBlogPostModel
{
	public Guid Id { get; private init; }
	public string Title { get; set; }
	public List<TagModel> Tags { get; set; }

#nullable disable
	public EditBlogPostModel()
	{
		Tags = [];
	}
#nullable enable

	public EditBlogPostModel(BlogPostModel blogPost)
	{
		Id = blogPost.Id;
		Title = blogPost.Title;
		Tags = [.. blogPost.Tags];
	}
}
