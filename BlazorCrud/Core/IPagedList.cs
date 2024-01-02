namespace BlazorCrud.Core;

public interface IPagedList<out T> : IReadOnlyList<T>
{
	int PageNumber { get; }

	bool IsFirstPage { get; }

	bool IsLastPage { get; }
}
