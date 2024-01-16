// Inspired by https://github.com/vkhorikov/CSharpFunctionalExtensions
// (Only partly used and heavily modified)
//
// Date of source:           20.02.2023
// Commit version of source: Latest commit 361357d on Jan 30, 2023
// 
// Original License:
//
// The MIT License (MIT)

// Copyright(c) 2015 Vladimir Khorikov

// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

namespace DotNetElements.Core;

public interface IResult
{
	bool IsFail { get; }
	bool IsOk { get; }
	string ErrorMessage { get; }
}

public readonly partial struct Result : IResult
{
	public bool IsFail { get; }
	public bool IsOk => !IsFail;

	public string ErrorMessage => IsFail ? errorMessage! : throw new ResultOkException();
	private readonly string? errorMessage;

	private Result(bool isFail, string? errorMessage)
	{
		IsFail = isFail;
		this.errorMessage = errorMessage;
	}

	// Create a successful result
	public static Result Ok() => new Result(false, null);

	/// <summary>
	/// Create a failed result with the given error message
	/// </summary>
	/// <param name="errorMessage">Friendly error message</param>
	/// <returns></returns>
	public static Result Fail(string errorMessage) => new Result(true, errorMessage);

	// Helper to construct a Result<T> without the need to explicit define the generic T
	// Create a successful result
	public static Result<T> Ok<T>(T value) => new Result<T>(false, null, value);

	// Create a failed result with the given error message
	internal static Result<T> Fail_Internal<T>(string errorMessage) => new Result<T>(true, errorMessage, default);

	// Create a failed result from another failed result
	public static Result<T> Fail<T>(Result failedResult)
	{
		if (failedResult.IsOk)
			throw new ResultOkException();

		return new Result<T>(true, failedResult.ErrorMessage, default);
	}

	public override string ToString() => IsFail ? $"Failure. Error message: {ErrorMessage}" : $"Success";
}

public readonly partial struct Result<T> : IResult
{
	public bool IsFail { get; }
	public bool IsOk => !IsFail;

	// Prevent accessing error on a successful result
	public string ErrorMessage => IsFail ? errorMessage! : throw new ResultOkException();
	private readonly string? errorMessage;

	// Prevent accessing value on a failed result
	public T Value => IsOk ? value! : throw new ResultFailException(errorMessage!);
	private readonly T? value;

	// A result should be constructed using the static Result.Ok and Result.Fail methods
	internal Result(bool isFail, string? errorMessage, T? value)
	{
		IsFail = isFail;
		this.errorMessage = errorMessage;
		this.value = value;
	}

	// Implicit cast from generic value (if given value is also a result, returns a copy)
	public static implicit operator Result<T>(T value)
	{
		if (value is Result<T> result)
		{
			string? resultError = result.IsFail ? result.ErrorMessage : null;
			T? resultValue = result.IsOk ? result.Value : default;

			return new Result<T>(result.IsFail, resultError, resultValue);
		}

		return Result.Ok(value);
	}

	// Implicit cast to the non generic result version
	public static implicit operator Result(Result<T> result)
	{
		if (result.IsOk)
			return Result.Ok();
		else
			return Result.Fail(result.ErrorMessage);
	}

	// Implicit cast from the generic result version
	public static implicit operator Result<T>(Result result)
	{
		if (result.IsOk)
			throw new ResultOkException("Can not convert from a Result.Ok to a Result.Ok<T>");
		else
			return Result.Fail_Internal<T>(result.ErrorMessage);
	}

	public override string ToString() => IsFail ? $"Failed to return {typeof(T)}. Error message: {ErrorMessage}" : $"Successfully returned {typeof(T)} with value {Value}";
}