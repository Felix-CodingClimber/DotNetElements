namespace DotNetElements.Core;
public static class StringExtensions
{
    public static string FirstNCharacters(this string str, int n)
    {
        if (string.IsNullOrEmpty(str) || str.Length <= n)
            return str;

        return str[..n];
    }

    public static string LastNCharacters(this string str, int n)
    {
        if (string.IsNullOrEmpty(str) || str.Length <= n)
            return str;

        return str.Substring(str.Length - n, n);
    }
}
