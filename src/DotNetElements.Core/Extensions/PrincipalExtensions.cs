using System.Security.Claims;

namespace DotNetElements.Core.Extensions;

/// <summary>
/// Claims related extensions for <see cref="ClaimsPrincipal"/>.
/// </summary>
public static class PrincipalExtensions
{
    /// <summary>
    /// Retrieves a required claim value from the given <see cref="ClaimsPrincipal"/>.
    /// </summary>
    /// <param name="principal">The <see cref="ClaimsPrincipal"/> from which to retrieve the claim value.</param>
    /// <param name="claimType">The type of the claim to retrieve.</param>
    /// <returns>The value of the specified claim.</returns>
    /// <exception cref="InvalidOperationException">Thrown if the specified claim type is not present in the <paramref name="principal"/>.</exception>
    public static string GetRequiredValue(this ClaimsPrincipal principal, string claimType)
    {
        Claim? claim = principal.FindFirst(claimType);

        if (claim is null)
            throw new InvalidOperationException($"Claim '{claimType}' is required but not present in the principal.");

        return claim.Value;
    }

    /// <summary>
    /// Retrieves and parses a required claim value from the specified <see cref="ClaimsPrincipal"/>.
    /// </summary>
    /// <typeparam name="T">The type to which the claim value should be parsed. Must implement <see cref="IParsable{T}"/>.</typeparam>
    /// <param name="principal">The <see cref="ClaimsPrincipal"/> from which to retrieve the claim.</param>
    /// <param name="claimType">The type of the claim to retrieve.</param>
    /// <returns>The parsed claim value of type <typeparamref name="T"/>.</returns>
    /// <exception cref="InvalidOperationException">Thrown if the claim of the specified <paramref name="claimType"/> is not present in the <paramref
    /// name="principal"/> or if the claim value cannot be parsed to type <typeparamref name="T"/>.</exception>
    public static T GetRequiredValue<T>(this ClaimsPrincipal principal, string claimType)
        where T : IParsable<T>
    {
        Claim? claim = principal.FindFirst(claimType);

        if (claim is null)
            throw new InvalidOperationException($"Claim '{claimType}' is required but not present in the principal.");

        if (!T.TryParse(claim.Value, null, out T? value))
            throw new InvalidOperationException($"Claim '{claimType}' has an invalid value: '{claim.Value}'.");

        return value;
    }

    /// <summary>
    /// Retrieves and parses an optional claim value from the specified <see cref="ClaimsPrincipal"/>.
    /// </summary>
    /// <typeparam name="T">The type to which the claim value should be parsed. Must implement <see cref="IParsable{T}"/>.</typeparam>
    /// <param name="principal">The <see cref="ClaimsPrincipal"/> from which to retrieve the claim.</param>
    /// <param name="claimType">The type of the claim to retrieve.</param>
    /// <returns>The parsed claim value of type <typeparamref name="T"/> if present; otherwise, <c>null</c>.</returns>
    /// <exception cref="InvalidOperationException">Thrown if the claim value cannot be parsed to type <typeparamref name="T"/>.</exception>
    public static T? GetValue<T>(this ClaimsPrincipal principal, string claimType)
        where T : IParsable<T>
    {
        Claim? claim = principal.FindFirst(claimType);

        if (claim is null)
            return default;

        if (!T.TryParse(claim.Value, null, out T? value))
            throw new InvalidOperationException($"Claim '{claimType}' has an invalid value: '{claim.Value}'.");

        return value;
    }
}
