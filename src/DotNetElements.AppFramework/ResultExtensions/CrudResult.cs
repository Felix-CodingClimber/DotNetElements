namespace DotNetElements.AppFramework;

public enum CrudError
{
    None,
    Unknown,
    NotFound,
    DuplicateEntry,
    EntryDeleted,
    ConcurrencyConflict,
}

[ErrorResult<CrudError>]
public partial class CrudResult<TValue>;
