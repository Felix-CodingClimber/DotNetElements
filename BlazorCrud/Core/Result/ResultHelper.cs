namespace BlazorCrud.Core;

public partial struct Result
{
	/// <summary>
	///     Creates a result whose success/failure reflects the supplied condition. Opposite of FailIf().
	/// </summary>
	public static Result OkIf(bool isSuccess, string error)
	{
		return isSuccess ? Ok() : Fail(error);
	}

	/// <summary>
	///     Creates a result whose success/failure depends on the supplied predicate. Opposite of FailIf().
	/// </summary>
	public static Result OkIf(Func<bool> predicate, string error)
	{
		return OkIf(predicate(), error);
	}

	/// <summary>
	///     Creates a result whose success/failure reflects the supplied condition. Opposite of FailIf().
	/// </summary>
	public static Result<T> OkIf<T>(bool isSuccess, in T value, string error)
	{
		return isSuccess ? Ok(value) : Fail<T>(error);
	}

	/// <summary>
	///     Creates a result whose success/failure depends on the supplied predicate. Opposite of FailIf().
	/// </summary>
	public static Result<T> OkIf<T>(Func<bool> predicate, in T value, string error)
	{
		return OkIf(predicate(), value, error);
	}

	/// <summary>
	///     Creates a result whose success/failure reflects the supplied condition. Opposite of OkIf().
	/// </summary>
	public static Result FailIf(bool isFailure, string error)
		=> OkIf(!isFailure, error);

	/// <summary>
	///     Creates a result whose success/failure depends on the supplied predicate. Opposite of OkIf().
	/// </summary>
	public static Result FailIf(Func<bool> failurePredicate, string error)
		=> OkIf(!failurePredicate(), error);

	/// <summary>
	///     Creates a result whose success/failure reflects the supplied condition. Opposite of OkIf().
	/// </summary>
	public static Result<T> FailIf<T>(bool isFailure, T value, string error)
	{
		return OkIf(!isFailure, value, error);
	}

	/// <summary>
	///     Creates a result whose success/failure depends on the supplied predicate. Opposite of OkIf().
	/// </summary>
	public static Result<T> FailIf<T>(Func<bool> failurePredicate, in T value, string error)
	{
		return OkIf(!failurePredicate(), value, error);
	}

	/// <summary>
	///     Creates a result whose success/failure depends on the supplied predicate. Opposite of FailIf().
	/// </summary>
	public static async Task<Result> OkIfAsync(Func<Task<bool>> predicate, string error)
	{
		bool isSuccess = await predicate();

		return OkIf(isSuccess, error);
	}

	/// <summary>
	///     Creates a result whose success/failure depends on the supplied predicate. Opposite of FailIf().
	/// </summary>
	public static async Task<Result<T>> OkIfAsync<T>(Func<Task<bool>> predicate, T value, string error)
	{
		bool isSuccess = await predicate();

		return OkIf(isSuccess, value, error);
	}

	/// <summary>
	///     Creates a result whose success/failure depends on the supplied predicate. Opposite of OkIf().
	/// </summary>
	public static async Task<Result> FailIfAsync(Func<Task<bool>> failurePredicate, string error)
	{
		bool isFailure = await failurePredicate();

		return OkIf(!isFailure, error);
	}

	/// <summary>
	///     Creates a result whose success/failure depends on the supplied predicate. Opposite of OkIf().
	/// </summary>
	public static async Task<Result<T>> FailIfAsync<T>(Func<Task<bool>> failurePredicate, T value, string error)
	{
		bool isFailure = await failurePredicate();

		return OkIf(!isFailure, value, error);
	}
}
