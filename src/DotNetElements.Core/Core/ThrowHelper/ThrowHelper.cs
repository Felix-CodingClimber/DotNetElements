using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;

namespace DotNetElements.Core;

public static class ThrowHelper
{
	/// <summary>
	///		Throws an <see cref="ArgumentNullException"/> if <paramref name="guid"/> is null or <see cref="Guid.Empty"/>.
	/// </summary>
	/// <param name="guid">The guid to validate as non-null and non Guid.Empty</param>
	/// <param name="paramName">The name of the parameter with which <paramref name="guid"/> corresponds.</param>
	public static void ThrowIfNullOrDefault([NotNull] Guid? guid, [CallerArgumentExpression(nameof(guid))] string? paramName = null)
	{
		if (guid is null || guid == Guid.Empty)
		{
			ThrowArgumentException(paramName);
		}
	}

	/// <summary>
	///		Throws an <see cref="ArgumentNullException"/> if <paramref name="guid"/> is <see cref="Guid.Empty"/>.
	/// </summary>
	/// <param name="guid">The guid to validate as non Guid.Empty</param>
	/// <param name="paramName">The name of the parameter with which <paramref name="guid"/> corresponds.</param>
	public static void ThrowIfDefault([NotNull] Guid guid, [CallerArgumentExpression(nameof(guid))] string? paramName = null)
	{
		if (guid == Guid.Empty)
		{
			ThrowArgumentException(paramName);
		}
	}

	/// <summary>
	///		Throws an <see cref="ArgumentNullException"/> if <paramref name="guid"/> is default.
	/// </summary>
	/// <param name="arguments">The arguments to validate as non-default</param>
	/// <param name="paramName">The name of the parameter with which <paramref name="guid"/> corresponds.</param>
	public static void ThrowIfDefault<T>([NotNull] T arguments, [CallerArgumentExpression(nameof(arguments))] string? paramName = null)
		where T : IEquatable<T>
	{
		if (arguments.Equals(default(T)))
		{
			ThrowArgumentException(paramName);
		}
	}

	[DoesNotReturn]
	private static void ThrowArgumentException(string? paramName) => throw new ArgumentException(paramName);

	[DoesNotReturn]
	private static void ThrowArgumentNullException(string? paramName) => throw new ArgumentNullException(paramName);
}
