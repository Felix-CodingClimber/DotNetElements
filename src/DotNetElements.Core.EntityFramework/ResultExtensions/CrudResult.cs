using DotNetElements.Core.Result;

namespace DotNetElements.Core.EntityFramework;

public enum CrudError
{
    Unknown,
    NotFound,
    DuplicateEntry,
    ConcurrencyConflict,
}

[ErrorResult<CrudError>]
public partial class CrudResult<TValue>;
