namespace BlazorCrud.Core;

public class ResultSuccessException : Exception
{
	public ResultSuccessException(string error = "Could not get error for a successful result") : base(error) { }
}

public class ResultFailureException : Exception
{
	public string Error { get; }

	public ResultFailureException(string error) : base($"Could not get value for a failed result with error {error}")
	{
		Error = error;
	}
}

public class ResultShouldNotFailException : Exception
{
	public ResultShouldNotFailException(string message = "Result should not have failed") : base(message) { }
}
