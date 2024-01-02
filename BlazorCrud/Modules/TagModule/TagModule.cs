﻿namespace BlazorCrud.Modules.TagModule;

public sealed class TagModule : IModule
{
	public const string BaseUrl = "/api/tags";

	public IServiceCollection RegisterModules(IServiceCollection services)
	{
		services.AddScoped<TagRepository>();

		return services;
	}

	public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints)
	{
		endpoints.MapPut(BaseUrl, async (EditTagModel tag, TagRepository tagRepo) =>
		{
			Result<Tag> result = await tagRepo.CreateAsync(tag.MapToEntity(), entity => entity.Label == tag.Label);

			return result.IsSuccess ? Results.Ok(result.Value.MapToModel()) : Results.Conflict(result.Error);
		});


		endpoints.MapPost(BaseUrl, async (EditTagModel tag, TagRepository tagRepo) =>
		{
			Result<Tag> result = await tagRepo.UpdateAsync(tag.Id, tag);

			return result.IsSuccess ? Results.Ok(result.Value.MapToModel()) : Results.NotFound(result.Error);
		});


		endpoints.MapDelete($"{BaseUrl}/{{id}}", async (Guid id, TagRepository tagRepo) =>
		{
			Result result = await tagRepo.DeleteAsync(id);

			return result.IsSuccess ? Results.Ok() : Results.NotFound(result.Error);
		});


		endpoints.MapGet(BaseUrl, async (TagRepository tagRepo) =>
		{
			return await tagRepo.GetAllWithProjectionAsync(query => query.MapToModel());
		});


		endpoints.MapGet($"{BaseUrl}/{{id}}", async (Guid id, TagRepository tagRepo) =>
		{
			Result<TagModel> result = await tagRepo.GetByIdWithProjectionAsync(id, query => query.MapToModel());

			return result.IsSuccess ? Results.Ok(result.Value) : Results.NotFound(result.Error);
		});

		return endpoints;
	}
}