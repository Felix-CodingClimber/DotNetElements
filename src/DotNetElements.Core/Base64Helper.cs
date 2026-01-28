namespace DotNetElements.Core;

public static class Base64Helper
{
	/// <summary>
	/// Calculates the length of a Base64-encoded string for a given number of bytes.
	/// </summary>
	/// <param name="bytes">Number of bytes</param>
	/// <returns>Length of the Base64-encoded string</returns>
	/// <remarks>Convert.ToBase64String returns Base64 padded. Base64Url.EncodeToString omits the optional padding characters.</remarks>
	public static int GetBase64StringLength(int bytes)
	{
		return ((4 * bytes / 3) + 3) & ~3;
	}

	/// <summary>
	/// Calculates the length of a Base64-encoded string for a given number of bytes without padding.
	/// </summary>
	/// <param name="bytes">Number of bytes</param>
	/// <returns>Length of the Base64-encoded string without padding</returns>
	/// <remarks>Convert.ToBase64String returns Base64 padded. Base64Url.EncodeToString omits the optional padding characters.</remarks>
	public static int GetBase64StringLengthUnpadded(int bytes)
	{
		return (4 * bytes + 2) / 3;
	}
}
