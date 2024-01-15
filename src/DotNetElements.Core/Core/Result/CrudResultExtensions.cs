using System.Linq.Expressions;
using Microsoft.AspNetCore.Http;
using IHttpResult = Microsoft.AspNetCore.Http.IResult;

namespace DotNetElements.Core;

public static class CrudResultExtensions
{
	public static IHttpResult MapToHttpResult(this CrudResult crudResult)
	{
		if (crudResult.IsOk)
			return Results.Ok();

		return MapToFailedHttpResult(crudResult.Error, crudResult.Message);
	}

	public static IHttpResult MapToHttpResultWithProjection<TEntity, TProjection>(this CrudResult<TEntity> crudResult, Expression<Func<TEntity, TProjection>> projection)
	{
		if (crudResult.IsOk)
			return Results.Ok(projection.Compile().Invoke(crudResult.Value));

		return MapToFailedHttpResult(crudResult.Error, crudResult.Message);
	}

	public static IHttpResult MapToHttpResult<TEntity>(this CrudResult<TEntity> crudResult)
	{
		if (crudResult.IsOk)
			return Results.Ok(crudResult.Value);

		return MapToFailedHttpResult(crudResult.Error, crudResult.Message);
	}

	private static IHttpResult MapToFailedHttpResult(CrudError error, string? message)
	{
		return error switch
		{
			CrudError.Unknown => Results.Problem(detail: message),
			CrudError.NotFound => Results.NotFound(message),
			CrudError.DuplicateEntry => Results.Conflict(message),
			CrudError.ConcurrencyConflict => Results.Conflict(message),
			_ => throw new NotImplementedException()
		};
	}
}
