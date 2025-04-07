using System.Linq.Expressions;
using Microsoft.AspNetCore.Http;

using IHttpResult = Microsoft.AspNetCore.Http.IResult;

namespace DotNetElements.AppFramework.AspNet.ResultExtensions;

public static class CrudResultExtensions
{
    public static IHttpResult MapToHttpResult(this CrudResult crudResult)
    {
        if (crudResult.HasError(out CrudError error))
            return MapToFailedHttpResult(error);

        return Results.Ok();
    }

    public static IHttpResult MapToHttpResult<TEntity>(this CrudResult<TEntity> crudResult)
    {
        if (crudResult.TryGetValue(out TEntity? value, out CrudError? error))
            return Results.Ok(value);

        return MapToFailedHttpResult(error.Value);
    }

    public static IHttpResult MapToHttpResultWithProjection<TEntity, TResult>(this CrudResult<TEntity> crudResult, Expression<Func<TEntity, TResult>> projection)
    {
        if (crudResult.TryGetValue(out TEntity? value, out CrudError? error))
            return Results.Ok(projection.Compile().Invoke(value));

        return MapToFailedHttpResult(error.Value);
    }

    private static IHttpResult MapToFailedHttpResult(CrudError errorCode)
    {
        return Results.Problem(title: $"{typeof(CrudError).Name}.{errorCode}", detail: ((int)errorCode).ToString(), type: typeof(CrudError).Name);
    }
}
