namespace DotNetElements.Core;

public partial struct CrudResult
{
	/// <summary>
	///		Creates a result whose success/failure reflects the supplied condition.
	/// </summary>
	public static CrudResult OkIf(bool isSuccess, CrudError errorCode, string? errorMessage = null)
	{
		return isSuccess ? Ok() : Fail_Internal(errorCode, errorMessage);
	}

	/// <summary>
	///		Creates a result whose success/failure depends on the supplied predicate.
	/// </summary>
	public static CrudResult OkIf(Func<bool> predicate, CrudError errorCode, string? errorMessage = null)
	{
		return OkIf(predicate(), errorCode, errorMessage);
	}

	/// <summary>
	///     Creates a result whose success/failure reflects the supplied condition.
	/// </summary>
	public static CrudResult<T> OkIf<T>(bool isSuccess, T value, CrudError errorCode, string? errorMessage = null)
	{
		return isSuccess ? Ok(value) : Fail_Internal<T>(errorCode, errorMessage);
	}

	/// <summary>
	///     Creates a result whose success/failure depends on the supplied predicate.
	/// </summary>
	public static CrudResult<T> OkIf<T>(Func<bool> predicate, T value, CrudError errorCode, string? errorMessage = null)
	{
		return OkIf(predicate(), value, errorCode, errorMessage);
	}

	/// <summary>
	///     Creates a result whose success/failure depends on weather the value is null or not.
	/// </summary>
	public static CrudResult<T> OkIfNotNull<T>(T? value, CrudError errorCode, string? errorMessage = null)
	{
		return OkIf(value is not null, value!, errorCode, errorMessage);
	}

	/// <summary>
	///     Creates a result whose success/failure depends on the supplied predicate.
	/// </summary>
	public static async Task<CrudResult> OkIfAsync(Func<Task<bool>> predicate, CrudError errorCode, string? errorMessage = null)
	{
		bool isSuccess = await predicate();

		return OkIf(isSuccess, errorCode, errorMessage);
	}

	/// <summary>
	///     Creates a result whose success/failure depends on the supplied predicate.
	/// </summary>
	public static async Task<CrudResult<T>> OkIfAsync<T>(Func<Task<bool>> predicate, T value, CrudError errorCode, string? errorMessage = null)
	{
		bool isSuccess = await predicate();

		return OkIf(isSuccess, value, errorCode, errorMessage);
	}
}
