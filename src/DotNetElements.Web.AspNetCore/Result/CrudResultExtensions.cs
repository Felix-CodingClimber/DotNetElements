using System.Linq.Expressions;
using Microsoft.AspNetCore.Http;
using IHttpResult = Microsoft.AspNetCore.Http.IResult;

namespace DotNetElements.Web.AspNetCore;

public static class CrudResultExtensions
{
	public static IHttpResult MapToHttpResult(this CrudResult crudResult)
	{
		if (crudResult.IsOk)
			return Results.Ok();

		return MapToFailedHttpResult(crudResult.ErrorCode, crudResult.ErrorMessage);
	}

	public static IHttpResult MapToHttpResultWithProjection<TEntity, TProjection>(this CrudResult<TEntity> crudResult, Expression<Func<TEntity, TProjection>> projection)
	{
		if (crudResult.IsOk)
			return Results.Ok(projection.Compile().Invoke(crudResult.Value));

		return MapToFailedHttpResult(crudResult.ErrorCode, crudResult.ErrorMessage);
	}

	public static IHttpResult MapToHttpResult<TEntity>(this CrudResult<TEntity> crudResult)
	{
		if (crudResult.IsOk)
			return Results.Ok(crudResult.Value);

		return MapToFailedHttpResult(crudResult.ErrorCode, crudResult.ErrorMessage);
	}

	private static IHttpResult MapToFailedHttpResult(CrudError errorCode, string? errorMessage)
	{
		return errorCode switch
		{
			CrudError.Unknown => Results.Problem(detail: errorMessage),
			CrudError.NotFound => Results.NotFound(errorMessage),
			CrudError.DuplicateEntry => Results.Conflict(errorMessage),
			CrudError.ConcurrencyConflict => Results.Conflict(errorMessage),
			_ => throw new NotImplementedException()
		};
	}
}
