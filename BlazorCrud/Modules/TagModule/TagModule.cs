namespace BlazorCrud.Modules.TagModule;

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
			Result<Tag> result = await tagRepo.CreateAsync(tag.MapToEntity(), entity => entity.Label == tag.Label);

			return result.IsOk ? Results.Ok(result.Value.MapToModel()) : Results.Conflict(result.Error);
		});


		endpoints.MapPost(BaseUrl, async (EditTagModel tag, TagRepository tagRepo) =>
		{
			Result<Tag> result = await tagRepo.UpdateAsync<Tag, EditTagModel>(tag.Id, tag);

			return result.IsOk ? Results.Ok(result.Value.MapToModel()) : Results.NotFound(result.Error);
		});


		endpoints.MapDelete($"{BaseUrl}/{{id}}", async (Guid id, TagRepository tagRepo) =>
		{
			Result result = await tagRepo.DeleteAsync(id);

			return result.IsOk ? Results.Ok() : Results.NotFound(result.Error);
		});


		endpoints.MapGet(BaseUrl, async (TagRepository tagRepo, CancellationToken cancellationToken) =>
		{
			return await tagRepo.GetAllWithProjectionAsync(query => query.MapToModel(), cancellationToken: cancellationToken);
		});


		endpoints.MapGet($"{BaseUrl}/{{id}}", async (Guid id, TagRepository tagRepo, CancellationToken cancellationToken) =>
		{
			Result<TagModel> result = await tagRepo.GetByIdWithProjectionAsync(id, query => query.MapToModel(), cancellationToken: cancellationToken);

			return result.IsOk ? Results.Ok(result.Value) : Results.NotFound(result.Error);
		});

		return endpoints;
	}
}
