using DotNetElements.CrudExample.Modules.TagModule;

namespace DotNetElements.CrudExample.Modules.BlogPostModule;

public class BlogPostModel : VersionedModel<Guid>
{
    public string Title { get; private init; }
    public IReadOnlyList<TagModel> Tags { get; private init; }

    public BlogPostModel(Guid id, string title, IReadOnlyList<TagModel> tags, Guid version) : base(id, version)
    {
        Title = title;
        Tags = tags;
    }
}

public class EditBlogPostModel : VersionedEditModel<BlogPostModel, Guid>
{
    public string Title { get; set; }
    public List<TagModel> Tags { get; set; }

#nullable disable
    public EditBlogPostModel() : base(Guid.NewGuid())
    {
        Tags = [];
    }
#nullable enable

    public EditBlogPostModel(BlogPostModel blogPost) : base(blogPost.Id, blogPost.Version)
    {
        Title = blogPost.Title;
        Tags = [.. blogPost.Tags];
    }
}
