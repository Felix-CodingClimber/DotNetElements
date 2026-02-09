namespace DotNetElements.AppFramework;

public enum CrudError
{
    None,
    Unknown,
    NotFound,
    EntryDeleted,
    ConcurrencyConflict,
}

[ErrorResult<CrudError>]
public partial class CrudResult<TValue>;
