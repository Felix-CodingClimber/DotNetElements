using Microsoft.AspNetCore.Mvc;

namespace DotNetElements.CrudExample.Modules.TagModule;

public sealed class TagModule : IModule
{
	public const string BaseUrl = "/api/tags";

	public IServiceCollection RegisterModules(IServiceCollection services)
	{
		services.AddScoped<TagRepository>();
		services.AddManagedRepository<ManagedTagRepository, TagRepository, Tag, Guid>();

		return services;
	}

	public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints)
	{
		endpoints.MapPut(BaseUrl, async (EditTagModel tag, TagRepository tagRepo) =>
		{
			CrudResult<Tag> result = await tagRepo.CreateAsync(tag.MapToEntity(), entity => entity.Label == tag.Label);

			return result.MapToHttpResultWithProjection(entity => entity.MapToModel());
		});


		endpoints.MapPost(BaseUrl, async (EditTagModel tag, TagRepository tagRepo) =>
		{
			CrudResult<Tag> result = await tagRepo.UpdateAsync<Tag, EditTagModel>(tag.Id, tag);

			return result.MapToHttpResultWithProjection(entity => entity.MapToModel());
		});


		endpoints.MapDelete(BaseUrl, async ([FromBody] TagModel tag, TagRepository tagRepo) =>
		{
			CrudResult result = await tagRepo.DeleteAsync(tag);

			return result.MapToHttpResult();
		});


		endpoints.MapGet(BaseUrl, async (TagRepository tagRepo, CancellationToken cancellationToken) =>
		{
			return await tagRepo.GetAllWithProjectionAsync(query => query.MapToModel(), cancellationToken: cancellationToken);
		});


		endpoints.MapGet($"{BaseUrl}/{{id}}", async (Guid id, TagRepository tagRepo, CancellationToken cancellationToken) =>
		{
			CrudResult<TagModel> result = await tagRepo.GetByIdWithProjectionAsync(id, query => query.MapToModel(), cancellationToken: cancellationToken);

			return result.MapToHttpResult();
		});

		return endpoints;
	}
}
