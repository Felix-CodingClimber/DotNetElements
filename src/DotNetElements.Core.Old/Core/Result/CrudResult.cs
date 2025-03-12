namespace DotNetElements.Core;

public enum CrudError
{
	Unknown,
	NotFound,
	DuplicateEntry,
	ConcurrencyConflict,
}

// todo make abstract base class with TErrorCodeEnum as type parameter
// and where TErrorCodeEnum is enum constraint
// Inherited classes can provide custom error codes
// Error codes should be used to communicate errors back to client

public readonly partial struct CrudResult : IResult
{
	public bool IsFail { get; }
	public bool IsOk => !IsFail;

	public CrudError ErrorCode => IsFail ? errorCode!.Value : throw new ResultOkException();
	private readonly CrudError? errorCode;

	public string ErrorMessage => IsFail ? errorMessage! : throw new ResultOkException();
	private readonly string? errorMessage;

	private CrudResult(bool isFail, CrudError? error, string? errorMessage)
	{
		IsFail = isFail;
		this.errorCode = error;
		this.errorMessage = errorMessage;
	}

	/// <summary>
	///		Create a successful result
	/// </summary>
	public static CrudResult Ok() => new CrudResult(false, null, null);

	/// <summary>
	///		Create a failed result with the given an undefined error code and given message
	/// </summary>
	/// <param name="errorMessage">Optional error message</param>
	/// <returns></returns>
	public static CrudResult Fail(string? errorMessage = null) => new CrudResult(true, CrudError.Unknown, errorMessage);

	internal static CrudResult Fail_Internal(CrudError errorCode, string? errorMessage = null) => new CrudResult(true, errorCode, errorMessage);

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
	///		Create a successful result
	///		Helper to construct a CrudResult<T> without the need to explicit define the generic T
	/// </summary>
	/// <typeparam name="T">Type of the return value</typeparam>
	/// <param name="value">Return value</param>
	/// <returns></returns>
	public static CrudResult<T> Ok<T>(T value) => new CrudResult<T>(false, null, null, value);

	internal static CrudResult<T> Fail_Internal<T>(CrudError errorCode, string? errorMessage = null) => new CrudResult<T>(true, errorCode, errorMessage, default);

	public override string ToString() => IsFail ? $"Failure. Error code: {ErrorCode}" : $"Success";
}

public readonly partial struct CrudResult<T>
{
	public bool IsFail { get; }
	public bool IsOk => !IsFail;

	public CrudError ErrorCode => IsFail ? errorCode!.Value : throw new ResultOkException();
	private readonly CrudError? errorCode;

	public string ErrorMessage => IsFail ? errorMessage! : throw new ResultOkException();
	private readonly string? errorMessage;

	public T Value => IsOk ? value! : throw new ResultFailException(errorCode!.Value.ToString());
	private readonly T? value;

	// A result should be constructed using the static CrudResult.Ok and CrudResult.Fail methods
	internal CrudResult(bool isFail, CrudError? errorCode, string? errorMessage, T? value)
	{
		IsFail = isFail;
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
		this.value = value;
	}

	// Implicit cast from generic value (if given value is also a result, returns a copy)
	public static implicit operator CrudResult<T>(T value)
	{
		if (value is CrudResult<T> result)
		{
			CrudError? resultError = result.IsFail ? result.ErrorCode : null;
			string? resultMessage = result.IsFail ? result.ErrorMessage : null;
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
			return CrudResult.Fail_Internal(result.ErrorCode, result.ErrorMessage);
	}

	// Implicit cast from the generic result version
	public static implicit operator CrudResult<T>(CrudResult result)
	{
		if (result.IsOk)
			throw new ResultOkException("Can not convert from a CrudResult.Ok to a CrudResult.Ok<T>");
		else
			return CrudResult.Fail_Internal<T>(result.ErrorCode, result.ErrorMessage);
	}

	public override string ToString() => IsFail ? $"Failed to return {typeof(T)}. Error code: {ErrorCode}" : $"Successfully returned {typeof(T)} with value {Value}";
}
