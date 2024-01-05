using BlazorCrud.Modules.TagModule;

namespace BlazorCrud.Modules.BlogPostModule;

public static class MapperExtensions
{
	public static BlogPost MapToEntity(this EditBlogPostModel model)
	{
		return new BlogPost
		(
			model.Id,
			model.Title,
			model.Tags.Select(tag => new Tag(tag.Id)).ToList(),
			model.Version
		);
	}

	public static BlogPostModel MapToModel(this BlogPost entity)
	{
		return new BlogPostModel
		(
			entity.Id,
			entity.Title,
			entity.Tags.Select(tag => tag.MapToModel()).ToList(),
			entity.Version
		);
	}

	public static IQueryable<BlogPostModel> MapToModel(this IQueryable<BlogPost> query)
	{
		return Queryable.Select(query, entity => new BlogPostModel
		(
			entity.Id,
			entity.Title,
			Enumerable.ToList(Enumerable.Select(entity.Tags, tag => new TagModel(tag.Id, tag.Label, tag.Version))),
			entity.Version
		));
	}

	public static IQueryable<ModelWithDetails<BlogPostModel, AuditedModelDetails>> MapToModelWithDetails(this IQueryable<BlogPost> query)
	{
		return Queryable.Select(query, entity => new ModelWithDetails<BlogPostModel, AuditedModelDetails>(new BlogPostModel
		(
			entity.Id,
			entity.Title,
			Enumerable.ToList(Enumerable.Select(entity.Tags, tag => new TagModel(tag.Id, tag.Label, tag.Version))),
			entity.Version
		)));
	}
}
