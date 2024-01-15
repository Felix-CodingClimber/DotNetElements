using Microsoft.AspNetCore.Mvc;

namespace DotNetElements.CrudExample.Modules.BlogPostModule;

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
			CrudResult<BlogPost> result = await blogPostRepo.CreateAsync(blogPost.MapToEntity());

			return result.MapToHttpResultWithProjection(entity => entity.MapToModel());
		});


		endpoints.MapPost(BaseUrl, async (EditBlogPostModel blogPost, BlogPostRepository blogPostRepo) =>
		{
			CrudResult<BlogPost> result = await blogPostRepo.UpdateAsync<BlogPost, EditBlogPostModel>(blogPost.Id, blogPost);

			return result.MapToHttpResultWithProjection(entity => entity.MapToModel());
		});


		endpoints.MapDelete(BaseUrl, async ([FromBody] BlogPostModel blogPost, BlogPostRepository blogPostRepo) =>
		{
			CrudResult result = await blogPostRepo.DeleteAsync(blogPost);

			return result.MapToHttpResult();
		});


		endpoints.MapGet(BaseUrl, async (BlogPostRepository blogPostRepo, CancellationToken cancellationToken) =>
		{
			return await blogPostRepo.GetAllWithProjectionAsync(query => query.MapToModel(), cancellationToken: cancellationToken);
		});


		endpoints.MapGet($"{BaseUrl}/{{id}}", async (Guid id, BlogPostRepository blogPostRepo, CancellationToken cancellationToken) =>
		{
			CrudResult<BlogPostModel> result = await blogPostRepo.GetByIdWithProjectionAsync(id, query => query.MapToModel(), cancellationToken: cancellationToken);

			return result.MapToHttpResult();
		});

		return endpoints;
	}
}
