// Inspired by https://github.com/vkhorikov/CSharpFunctionalExtensions
// (Only partly used and heavily modified)
//
// Date of source:           20.02.2023
// Commit version of source: Latest commit 361357d on Jan 30, 2023
// 
// Used classes included and modified:
// - Result and Result<T>
// - Helper classes for Result and Result<T>
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
}

public readonly partial struct Result : IResult
{
	public bool IsFail { get; }
	public bool IsOk => !IsFail;

	public string Error => IsFail ? error! : throw new ResultOkException();
	private readonly string? error;

	private Result(bool isFail, string? error)
	{
		IsFail = isFail;
		this.error = error;
	}

	// Create a successful result
	public static Result Ok() => new Result(false, null);

	// Create a failed result with the given error
	public static Result Fail(string error) => new Result(true, error);

	// Helper to construct a Result<T> without the need to explicit define the generic T
	// Create a successful result
	public static Result<T> Ok<T>(T value) => new Result<T>(false, null, value);

	// Create a failed result with the given error
	public static Result<T> Fail<T>(string error = "See log file for more info") => new Result<T>(true, error, default);

	// Create a failed result from another failed result
	public static Result<T> Fail<T>(Result failedResult)
	{
		if (failedResult.IsOk)
			throw new ResultOkException();

		return new Result<T>(true, failedResult.Error, default);
	}

	public override string ToString() => IsFail ? $"Failure. Error: {Error}" : $"Success";
}

public readonly partial struct Result<T> : IResult
{
	public bool IsFail { get; }
	public bool IsOk => !IsFail;

	// Prevent accessing error on a successful result
	public string Error => IsFail ? error! : throw new ResultOkException();
	private readonly string? error;

	// Prevent accessing value on a failed result
	public T Value => IsOk ? value! : throw new ResultFailException(error!);
	private readonly T? value;

	// A result should be constructed using the static Result.Ok and Result.Fail methods
	internal Result(bool isFail, string? error, T? value)
	{
		IsFail = isFail;
		this.error = error;
		this.value = value;
	}

	// Implicit cast from generic value (if given value is also a result, returns a copy)
	public static implicit operator Result<T>(T value)
	{
		if (value is Result<T> result)
		{
			string? resultError = result.IsFail ? result.Error : null;
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
			return Result.Fail(result.Error);
	}

	// Implicit cast from the generic result version
	public static implicit operator Result<T>(Result result)
	{
		if (result.IsOk)
			throw new ResultOkException("Can not convert from a Result.Ok to a Result.Ok<T>");
		else
			return Result.Fail<T>(result.Error);
	}

	public override string ToString() => IsFail ? $"Failed to return {typeof(T)}. Error: {Error}" : $"Successfully returned {typeof(T)} with value {Value}";
}