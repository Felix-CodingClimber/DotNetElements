using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;

namespace DotNetElements.Core;

public static class ThrowIf
{
    /// <summary>
    ///		Throws an <see cref="ArgumentNullException"/> if <paramref name="guid"/> is null or <see cref="Guid.Empty"/>.
    /// </summary>
    /// <param name="guid">The guid to validate as non-null and non Guid.Empty</param>
    /// <param name="paramName">The name of the parameter with which <paramref name="guid"/> corresponds.</param>
    [DebuggerHidden, StackTraceHidden]
    public static void NullOrDefault([NotNull] Guid? guid, [CallerArgumentExpression(nameof(guid))] string? paramName = null)
    {
        if (guid is null || guid == Guid.Empty)
            ThrowArgumentException(paramName);
    }

    /// <summary>
    ///		Throws an <see cref="ArgumentNullException"/> if <paramref name="guid"/> is <see cref="Guid.Empty"/>.
    /// </summary>
    /// <param name="guid">The guid to validate as non Guid.Empty</param>
    /// <param name="paramName">The name of the parameter with which <paramref name="guid"/> corresponds.</param>
    [DebuggerHidden, StackTraceHidden]
    public static void Default([NotNull] Guid guid, [CallerArgumentExpression(nameof(guid))] string? paramName = null)
    {
        if (guid == Guid.Empty)
            ThrowArgumentException(paramName);
    }

    /// <summary>
    ///		Throws an <see cref="ArgumentNullException"/> if <paramref name="guid"/> is default.
    /// </summary>
    /// <param name="argument">The argument to validate as non-default</param>
    /// <param name="paramName">The name of the parameter with which <paramref name="guid"/> corresponds.</param>
    [DebuggerHidden, StackTraceHidden]
    public static void Default<T>([NotNull] T argument, [CallerArgumentExpression(nameof(argument))] string? paramName = null)
        where T : IEquatable<T>
    {
        if (argument.Equals(default(T)))
            ThrowArgumentException(paramName);
    }

    /// <summary>
    ///     Throws an <see cref="ArgumentNullException"/> if <paramref name="collection"/> is <see cref="null"/>.
    ///     Throws an <see cref="ArgumentException"/> if <paramref name="collection"/> is empty.
    /// </summary>
    /// <typeparam name="T">Type of the items in the collection.</typeparam>
    /// <param name="collection">Collection to validate as non null or empty.</param>
    /// <param name="paramName">The name of the parameter with which <paramref name="collection"/> corresponds.</param>
    /// <exception cref="ArgumentException"></exception>
    public static void CollectionIsNullOrEmpty<T>([NotNull] ICollection<T>? collection, [CallerArgumentExpression(nameof(collection))] string? paramName = null)
    {
        ArgumentNullException.ThrowIfNull(collection, paramName);

        if (collection.Count == 0)
            throw new ArgumentException("The collection is empty...", paramName);
    }

    [DoesNotReturn]
    [DebuggerHidden, StackTraceHidden]
    private static void ThrowArgumentException(string? paramName) => throw new ArgumentException(paramName);

	[DoesNotReturn]
	private static void ThrowArgumentNullException(string? paramName) => throw new ArgumentNullException(paramName);
}
