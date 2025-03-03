namespace DotNetElements.Core.EntityFramework;

// todo move to .Result package
public static partial class CrudResultHelperExtensions
{
    /// <summary>
    ///     Creates a result whose success/failure reflects the supplied condition.
    /// </summary>
    public static CrudResult<TValue> OkIf<TValue>(bool isSuccess, TValue value, CrudError errorCode)
    {
        return isSuccess ? value : CrudResult<TValue>.Fail(errorCode);
    }

    /// <summary>
    ///     Creates a result whose success/failure depends on the supplied predicate.
    /// </summary>
    public static CrudResult<TValue> OkIf<TValue>(Func<bool> predicate, TValue value, CrudError errorCode)
    {
        return predicate.Invoke() ? value : CrudResult<TValue>.Fail(errorCode);
    }

    /// <summary>
    ///     Creates a result whose success/failure depends on weather the value is null or not.
    /// </summary>
    public static CrudResult<TValue> OkIfNotNull<TValue>(TValue? value, CrudError errorCode)
    {
        return value is not null ? value : CrudResult<TValue>.Fail(errorCode);
    }
}
