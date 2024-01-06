namespace DotNetElements.CrudExample.Modules.TagModule;

public static class MapperExtensions
{
	public static Tag MapToEntity(this EditTagModel model)
	{
		return new Tag
		(
			model.Id,
			model.Label,
			model.Version
		);
	}

	public static TagModel MapToModel(this Tag entity)
	{
		return new TagModel
		(
			entity.Id,
			entity.Label,
			entity.Version
		);
	}

	public static IQueryable<TagModel> MapToModel(this IQueryable<Tag> query)
	{
		return Queryable.Select(query, entity => new TagModel
		(
			entity.Id,
			entity.Label,
			entity.Version
		));
	}

	public static IQueryable<ModelWithDetails<TagModel, AuditedModelDetails>> MapToModelWithDetails(this IQueryable<Tag> query)
	{
		return Queryable.Select(query, entity => new ModelWithDetails<TagModel, AuditedModelDetails>(new TagModel
		(
			entity.Id,
			entity.Label,
			entity.Version
		)));
	}
}
