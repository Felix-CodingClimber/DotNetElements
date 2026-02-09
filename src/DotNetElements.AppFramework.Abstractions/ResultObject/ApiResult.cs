using DotNetElements.Core.ResultObject;

namespace DotNetElements.AppFramework.Abstractions.ResultObject;

[ErrorResult<ErrorDetails>]
public sealed partial class ApiResult<TValue>;

public static partial class ApiResultHelper
{
	public static ApiResult Fail(string errorType, string title) => ApiResult.Fail(new ErrorDetails() { Type = errorType, Title = title });
	public static ApiResult Fail(string errorType, string title, string? details) => ApiResult.Fail(new ErrorDetails() { Type = errorType, Title = title, Details = details });
}