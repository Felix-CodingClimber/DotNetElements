using Microsoft.Extensions.Logging;
using System.Net.Http.Json;
using System.Text;
using System.Text.RegularExpressions;

namespace DotNetElements.Extensions.Icons;

internal partial class MaterialIconsSvgGenerator
{
	private readonly HttpClient httpClient;
	private readonly ILogger<MaterialIconsSvgGenerator> logger;

	public MaterialIconsSvgGenerator(HttpClient httpClient, ILogger<MaterialIconsSvgGenerator> logger)
	{
		this.httpClient = httpClient;
		this.logger = logger;
	}

	[GeneratedRegex("<\\s*svg.*height=\"(?<height>\\d+)\".*width=\"(?<width>\\d+)\"[^>]*>\\s*<\\s*path\\s*d=\"(?<path>.*?)\"\\/>\\s*<\\s*\\/svg>")]
	private partial Regex SvgRegex();

	public async Task Run()
	{
		IReadOnlyList<MaterialIcon>? iconInfo = await GetIconInfoAsync();

		if (iconInfo is null)
			return;

		await WriteToFileAsync(iconInfo);

		logger.LogInformation("Generated Material icons");
	}

	private async Task<IReadOnlyList<MaterialIcon>?> GetIconInfoAsync()
	{
		GitRef? masterBranchRef = await httpClient.GetFromJsonAsync<GitRef>("https://api.github.com/repos/google/material-design-icons/git/refs/heads/master");
		if (masterBranchRef is null)
		{
			logger.LogError("Failed to get available icons from Github! (Failed to fetch master branch info.)");
			return null;
		}

		GitTreeResult? mainBranchTree = await httpClient.GetFromJsonAsync<GitTreeResult>($"https://api.github.com/repos/google/material-design-icons/git/trees/{masterBranchRef.Object.Sha}");
		if (mainBranchTree is null)
		{
			logger.LogError("Failed to get available icons from Github! (Failed to fetch master branch main tree.)");
			return null;
		}

		GitTree? symbolsFolder = mainBranchTree.Tree.FirstOrDefault(tree => tree.Path == "symbols");
		if (symbolsFolder is null)
		{
			logger.LogError("Failed to get available icons from Github! (Missing symbols folder tree.)");
			return null;
		}

		GitTreeResult? symbolsFolderTree = await httpClient.GetFromJsonAsync<GitTreeResult>($"https://api.github.com/repos/google/material-design-icons/git/trees/{symbolsFolder.Sha}");
		if (symbolsFolderTree is null)
		{
			logger.LogError("Failed to get available icons from Github! (Failed to fetch symbols folder tree.)");
			return null;
		}

		GitTree? webFolder = symbolsFolderTree.Tree.FirstOrDefault(tree => tree.Path == "web");
		if (webFolder is null)
		{
			logger.LogError("Failed to get available icons from Github! (Missing web folder tree.)");
			return null;
		}

		GitTreeResult? webFolderTree = await httpClient.GetFromJsonAsync<GitTreeResult>($"https://api.github.com/repos/google/material-design-icons/git/trees/{webFolder.Sha}");
		if (webFolderTree is null)
		{
			logger.LogError("Failed to get available icons from Github! (Failed to fetch web folder tree.)");
			return null;
		}

		List<MaterialIcon> iconSet = new List<MaterialIcon>();

		foreach (string iconName in webFolderTree.Tree.Select(treeItem => treeItem.Path))
		{
			HttpResponseMessage response = await httpClient.GetAsync($"https://raw.githubusercontent.com/google/material-design-icons/master/symbols/web/{iconName}/materialsymbolsrounded/{iconName}_24px.svg");

			if (!response.IsSuccessStatusCode)
			{
				logger.LogError($"Failed to get icon description from Github! (Icon: {iconName}, Error: {response.StatusCode})");
				continue;
			}

			string? iconDescription = await response.Content.ReadAsStringAsync();

			Match match = SvgRegex().Match(iconDescription);

			if (!match.Success)
			{
				logger.LogError($"Failed to parse icon description from Github! (Icon: {iconName})");
				continue;
			}

			iconSet.Add(new MaterialIcon(iconName, new SvgDescription(match.Groups["width"].Value, match.Groups["height"].Value, match.Groups["path"].Value)));

			//// Uncomment for debug purpose
			//if (iconSet.Count > 30)
			//	break;
		}

		return iconSet.ToList();
	}

	private async Task WriteToFileAsync(IReadOnlyList<MaterialIcon> iconInfo)
	{
		StringBuilder resultBuilder = new StringBuilder();
		resultBuilder.AppendLine(fileHeader);

		StringBuilder iconBuilder = new StringBuilder();

		foreach (MaterialIcon icon in iconInfo)
		{
			SvgDescription? svgDescription = icon.SvgDescription;

			if (svgDescription is null
				|| string.IsNullOrEmpty(svgDescription.Width)
				|| string.IsNullOrEmpty(svgDescription.Height)
				|| string.IsNullOrEmpty(svgDescription.Path))
			{
				logger.LogWarning($"Skipped icon {icon.Id}, invalid svg description");
				continue;
			}

			iconBuilder.AppendLine(
			$"""
					/// <summary>
					/// <para>
					/// <b>GoogleFontIcon</b>
					/// </para>
					/// <para>
					/// <b>Label:</b> {icon.Id}
					/// </para>
					/// </summary>
			""");

			string varName = icon.Id!.ConvertSnakeToPascalCase();

			iconBuilder.AppendLine($"		public const string {varName} = \"{svgDescription.Width},{svgDescription.Height},{svgDescription.Path}\";");
			iconBuilder.AppendLine();
		}

		resultBuilder.Append(iconBuilder);
		resultBuilder.Append(fileFooter);

		await File.WriteAllTextAsync("MaterialIcons.cs", resultBuilder.ToString());
	}

	private const string fileHeader =
    """
	//----------------------
	// <auto-generated>
	//     Generated by the BlazorSpa.Tools MaterialIconsGenerator. DO NOT EDIT!
	//     source: MaterialIconsGenerator.cs
	// </auto-generated>
	//----------------------

	namespace BlazorSpa.Components;

	public static partial class Icons
	{
		public static partial class Material
		{
	""";

	private const string fileFooter =
	"""
		}
	}

	""";

	private record MaterialIcon(string Id, SvgDescription SvgDescription);

	private record SvgDescription(string Width, string Height, string Path);

	private record SymbolIconName(string Name);

	private record GitTreeResult(string Sha, IReadOnlyList<GitTree> Tree);
	private record GitTree(string Path, string Sha);
	private record GitRef(string Ref, GitObject Object);
	private record GitObject(string Sha);
}
