using System.Text;

namespace DotNetElements.Extensions.Icons;

internal static class StringExtensions
{
	public static string ConvertDashToPascalCase(this string value)
	{
		StringBuilder sb = new StringBuilder();
		bool caseFlag = false;
		for (int i = 0; i < value.Length; ++i)
		{
			char c = value[i];
			if (c == '-')
			{
				caseFlag = true;
			}
			else if (caseFlag)
			{
				sb.Append(char.ToUpper(c));
				caseFlag = false;
			}
			else if (i == 0)
			{
				if (char.IsDigit(c))
					sb.Append('_');

				sb.Append(char.ToUpper(c));
			}
			else
			{
				sb.Append(c);
			}
		}
		return sb.ToString();
	}

	public static string ConvertSnakeToPascalCase(this string value)
	{
		StringBuilder sb = new StringBuilder();
		bool caseFlag = false;
		for (int i = 0; i < value.Length; ++i)
		{
			char c = value[i];
			if (c == '_')
			{
				caseFlag = true;
			}
			else if (caseFlag)
			{
				sb.Append(char.ToUpper(c));
				caseFlag = false;
			}
			else if (i == 0)
			{
				if (char.IsDigit(c))
					sb.Append('_');

				sb.Append(char.ToUpper(c));
			}
			else
			{
				sb.Append(c);
			}
		}
		return sb.ToString();
	}
}
