﻿namespace BlazorCrud.Modules.TagModule;

public static class MapperExtensions
{
	public static Tag MapToEntity(this EditTagModel model)
	{
		return new Tag
		(
			model.Id,
			model.Label
		);
	}

	public static TagModel MapToModel(this Tag entity)
	{
		return new TagModel
		(
			entity.Id,
			entity.Label
		);
	}

	public static IQueryable<TagModel> MapToModel(this IQueryable<Tag> query)
	{
		return Queryable.Select(query, entity => new TagModel
		(
			entity.Id,
			entity.Label
		));
	}
}