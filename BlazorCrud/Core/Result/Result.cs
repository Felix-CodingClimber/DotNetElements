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

namespace BlazorCrud.Core;

public interface IResult
{
	bool IsFailure { get; }
	bool IsSuccess { get; }
}

public readonly partial struct Result : IResult
{
	public bool IsFailure { get; }
	public bool IsSuccess => !IsFailure;

	public string Error => IsFailure ? error! : throw new ResultSuccessException();
	private readonly string? error;

	private Result(bool isFailure, string? error)
	{
		IsFailure = isFailure;
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
	public static Result<T> Fail<T>(string error = "See log file for more infos") => new Result<T>(true, error, default);

	// Create a failed result from another failed result
	public static Result<T> Fail<T>(Result failedResult)
	{
		if (failedResult.IsSuccess)
			throw new ResultSuccessException();

		return new Result<T>(true, failedResult.Error, default);
	}

	public override string ToString() => IsFailure ? $"Failure. Error: {Error}" : $"Success";
}

public readonly partial struct Result<T> : IResult
{
	public bool IsFailure { get; }
	public bool IsSuccess => !IsFailure;

	// Prevent accessing error on a successful result
	public string Error => IsFailure ? error! : throw new ResultSuccessException();
	private readonly string? error;

	// Prevent accessing value on a failed result
	public T Value => IsSuccess ? value! : throw new ResultFailureException(error!);
	private readonly T? value;

	// A result should be constructed using the static .Success and .Failure methods
	internal Result(bool isFailure, string? error, T? value)
	{
		IsFailure = isFailure;
		this.error = error;
		this.value = value;
	}

	// Implicit cast from generic value (if given value is also a result, returns a copy)
	public static implicit operator Result<T>(T value)
	{
		if (value is Result<T> result)
		{
			string? resultError = result.IsFailure ? result.Error : null;
			T? resultValue = result.IsSuccess ? result.Value : default;

			return new Result<T>(result.IsFailure, resultError, resultValue);
		}

		return Result.Ok(value);
	}

	// Implicit cast to the non generic result version
	public static implicit operator Result(Result<T> result)
	{
		if (result.IsSuccess)
			return Result.Ok();
		else
			return Result.Fail(result.Error);
	}

	// Implicit cast from the generic result version
	public static implicit operator Result<T>(Result result)
	{
		if (result.IsSuccess)
			throw new ResultSuccessException("Can not convert from a Result.Ok to a Result.Ok<T>");
		else
			return Result.Fail<T>(result.Error);
	}

	public override string ToString() => IsFailure ? $"Failed to return {typeof(T)}. Error: {Error}" : $"Successfully returned {typeof(T)} with value {Value}";
}