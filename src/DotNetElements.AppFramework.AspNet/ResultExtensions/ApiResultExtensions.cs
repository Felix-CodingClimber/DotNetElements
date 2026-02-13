using System.Linq.Expressions;
using Microsoft.AspNetCore.Http;

using IHttpResult = Microsoft.AspNetCore.Http.IResult;

namespace DotNetElements.AppFramework.AspNet.ResultExtensions;

public static class ApiResultExtensions
{
    public static IHttpResult MapToHttpResult(this ApiResult result)
    {
        if (result.HasError(out ErrorDetails error))
            return MapToFailedHttpResult(error);

        return Results.Ok();
    }

    public static IHttpResult MapToHttpResult<TEntity>(this ApiResult<TEntity> result)
    {
        if (result.TryGetValue(out TEntity? value, out ErrorDetails? error))
            return Results.Ok(value);

        return MapToFailedHttpResult(error.Value);
    }

    public static IHttpResult MapToHttpResultWithProjection<TEntity, TResult>(this ApiResult<TEntity> result, Expression<Func<TEntity, TResult>> projection)
    {
        if (result.TryGetValue(out TEntity? value, out ErrorDetails? error))
            return Results.Ok(projection.Compile().Invoke(value));

        return MapToFailedHttpResult(error.Value);
    }

    private static IHttpResult MapToFailedHttpResult(ErrorDetails error)
    {
        return Results.Problem(
            title: error.Title,
            detail: error.Details,
            type: error.Type);
    }
}
