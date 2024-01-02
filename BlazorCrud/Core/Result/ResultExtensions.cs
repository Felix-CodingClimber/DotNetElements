namespace BlazorCrud.Core;

public partial struct Result
{
	// Create a failed result with the given error
	public static Result DuplicateEntity(string error = "Entity does already exist.") => new Result(true, error);
	public static Result EntityNotFound<TId>(TId id) => new Result(true, $"Entity with ID {id} not found.");
}
