namespace BlazorCrud.Modules.BlogPostModule;

public sealed class BlogPostModule : IModule
{
	public const string BaseUrl = "/api/blogPosts";

	public IServiceCollection RegisterModules(IServiceCollection services)
	{
		services.AddScoped<BlogPostRepository>();
		services.AddManagedRepository<ManagedBlogPostRepository, BlogPostRepository, BlogPost, Guid>();

		return services;
	}

	public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints)
	{
		endpoints.MapPut(BaseUrl, async (EditBlogPostModel blogPost, BlogPostRepository blogPostRepo) =>
		{
			Result<BlogPost> result = await blogPostRepo.CreateAsync(blogPost.MapToEntity());

			return result.IsSuccess ? Results.Ok(result.Value.MapToModel()) : Results.Conflict(result.Error);
		});


		endpoints.MapPost(BaseUrl, async (EditBlogPostModel blogPost, BlogPostRepository blogPostRepo) =>
		{
			Result<BlogPost> result = await blogPostRepo.UpdateAsync<BlogPost, EditBlogPostModel>(blogPost.Id, blogPost);

			return result.IsSuccess ? Results.Ok(result.Value.MapToModel()) : Results.NotFound(result.Error);
		});


		endpoints.MapDelete($"{BaseUrl}/{{id}}", async (Guid id, BlogPostRepository blogPostRepo) =>
		{
			Result result = await blogPostRepo.DeleteAsync(id);

			return result.IsSuccess ? Results.Ok() : Results.NotFound(result.Error);
		});


		endpoints.MapGet(BaseUrl, async (BlogPostRepository blogPostRepo) =>
		{
			return await blogPostRepo.GetAllWithProjectionAsync(query => query.MapToModel());
		});


		endpoints.MapGet($"{BaseUrl}/{{id}}", async (Guid id, BlogPostRepository blogPostRepo) =>
		{
			Result<BlogPostModel> result = await blogPostRepo.GetByIdWithProjectionAsync(id, query => query.MapToModel());

			return result.IsSuccess ? Results.Ok(result.Value) : Results.NotFound(result.Error);
		});

		return endpoints;
	}
}
