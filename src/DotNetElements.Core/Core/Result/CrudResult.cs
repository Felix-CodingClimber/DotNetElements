namespace DotNetElements.Core;

public enum CrudError
{
	Unknown,
	NotFound,
	DuplicateEntry,
	ConcurrencyConflict,
}

public readonly partial struct CrudResult : IResult
{
	public bool IsFail { get; }
	public bool IsOk => !IsFail;

	public CrudError Error => IsFail ? error!.Value : throw new ResultOkException();
	private readonly CrudError? error;

	public string Message => IsFail ? message! : throw new ResultOkException();
	private readonly string? message;

	private CrudResult(bool isFail, CrudError? error, string? message)
	{
		IsFail = isFail;
		this.error = error;
		this.message = message;
	}

	/// <summary>
	/// Create a successful result
	/// </summary>
	public static CrudResult Ok() => new CrudResult(false, null, null);

	/// <summary>
	/// Create a failed result with the given error type and message
	/// </summary>
	/// <param name="error">Describes the error type</param>
	/// <param name="message">Optional error message</param>
	/// <returns></returns>
	public static CrudResult Fail(string? message = null) => new CrudResult(true, CrudError.Unknown, message);

	internal static CrudResult Fail_Internal(CrudError error, string? message = null) => new CrudResult(true, error, message);

	public static CrudResult DuplicateEntry()
		=> new CrudResult(true, CrudError.DuplicateEntry, "A similar entry does already exist.");

	public static CrudResult DuplicateEntry<TValue>(TValue duplicateValue)
		=> new CrudResult(true, CrudError.DuplicateEntry, $"Entry with value {duplicateValue} does already exist.");

	public static CrudResult NotFound<TKey>(TKey id)
		where TKey : notnull
		=> new CrudResult(true, CrudError.NotFound, id.ToString());

	public static CrudResult ConcurrencyConflict()
		=> new CrudResult(true, CrudError.ConcurrencyConflict, "Entry was changed, check updated values.");

	/// <summary>
	/// Create a successful result
	/// Helper to construct a CrudResult<T> without the need to explicit define the generic T
	/// </summary>
	/// <typeparam name="T">Type of the return value</typeparam>
	/// <param name="value">Return value</param>
	/// <returns></returns>
	public static CrudResult<T> Ok<T>(T value) => new CrudResult<T>(false, null, null, value);

	internal static CrudResult<T> Fail_Internal<T>(CrudError error, string? message = null) => new CrudResult<T>(true, error, message, default);

	public override string ToString() => IsFail ? $"Failure. Error: {Error}" : $"Success";
}

public readonly partial struct CrudResult<T>
{
	public bool IsFail { get; }
	public bool IsOk => !IsFail;

	public CrudError Error => IsFail ? error!.Value : throw new ResultOkException();
	private readonly CrudError? error;

	public string Message => IsFail ? message! : throw new ResultOkException();
	private readonly string? message;

	public T Value => IsOk ? value! : throw new ResultFailException(error!.Value.ToString());
	private readonly T? value;

	// A result should be constructed using the static CrudResult.Ok and CrudResult.Fail methods
	internal CrudResult(bool isFail, CrudError? error, string? message, T? value)
	{
		IsFail = isFail;
		this.error = error;
		this.message = message;
		this.value = value;
	}

	// Implicit cast from generic value (if given value is also a result, returns a copy)
	public static implicit operator CrudResult<T>(T value)
	{
		if (value is CrudResult<T> result)
		{
			CrudError? resultError = result.IsFail ? result.Error : null;
			string? resultMessage = result.IsFail ? result.Message : null;
			T? resultValue = result.IsOk ? result.Value : default;

			return new CrudResult<T>(result.IsFail, resultError, resultMessage, resultValue);
		}

		return CrudResult.Ok(value);
	}

	// Implicit cast to the non generic result version
	public static implicit operator CrudResult(CrudResult<T> result)
	{
		if (result.IsOk)
			return CrudResult.Ok();
		else
			return CrudResult.Fail_Internal(result.Error, result.Message);
	}

	// Implicit cast from the generic result version
	public static implicit operator CrudResult<T>(CrudResult result)
	{
		if (result.IsOk)
			throw new ResultOkException("Can not convert from a CrudResult.Ok to a CrudResult.Ok<T>");
		else
			return CrudResult.Fail_Internal<T>(result.Error, result.Message);
	}

	public override string ToString() => IsFail ? $"Failed to return {typeof(T)}. Error: {Error}" : $"Successfully returned {typeof(T)} with value {Value}";
}
