namespace DotNetElements.Core;

public partial struct Result
{
	/// <summary>
	///     Creates a result whose success/failure reflects the supplied condition.
	/// </summary>
	public static Result OkIf(bool isSuccess, string error)
	{
		return isSuccess ? Ok() : Fail(error);
	}

	/// <summary>
	///     Creates a result whose success/failure depends on the supplied predicate.
	/// </summary>
	public static Result OkIf(Func<bool> predicate, string error)
	{
		return OkIf(predicate(), error);
	}

	/// <summary>
	///     Creates a result whose success/failure reflects the supplied condition.
	/// </summary>
	public static Result<T> OkIf<T>(bool isSuccess, T value, string error)
	{
		return isSuccess ? Ok(value) : Fail<T>(error);
	}

	/// <summary>
	///     Creates a result whose success/failure depends on the supplied predicate.
	/// </summary>
	public static Result<T> OkIf<T>(Func<bool> predicate, T value, string error)
	{
		return OkIf(predicate(), value, error);
	}

	/// <summary>
	///     Creates a result whose success/failure depends on weather the value is null or not.
	/// </summary>
	public static Result<T> OkIfNotNull<T>(T? value, string error)
	{
		return OkIf(value is not null, value!, error);
	}

	/// <summary>
	///     Creates a result whose success/failure depends on the supplied predicate.
	/// </summary>
	public static async Task<Result> OkIfAsync(Func<Task<bool>> predicate, string error)
	{
		bool isSuccess = await predicate();

		return OkIf(isSuccess, error);
	}

	/// <summary>
	///     Creates a result whose success/failure depends on the supplied predicate.
	/// </summary>
	public static async Task<Result<T>> OkIfAsync<T>(Func<Task<bool>> predicate, T value, string error)
	{
		bool isSuccess = await predicate();

		return OkIf(isSuccess, value, error);
	}
}
