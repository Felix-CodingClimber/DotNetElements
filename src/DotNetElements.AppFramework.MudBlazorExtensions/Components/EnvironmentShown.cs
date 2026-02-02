using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Rendering;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

namespace DotNetElements.AppFramework.MudBlazorExtensions.Components;

public sealed class EnvironmentShown : ComponentBase
{
	/// <summary>
	/// Comma separated list of environment names for which the child content is rendered.
	/// </summary>
	[Parameter]
	public string? Include { get; set; }

	/// <summary>
	/// Child content of component.
	/// </summary>
	[Parameter]
	public RenderFragment? ChildContent { get; set; }

	private string[]? includedEnvironments;

	private bool shouldRender = true;

	private readonly IWebAssemblyHostEnvironment hostEnvironment;

	public EnvironmentShown(IWebAssemblyHostEnvironment hostEnvironment)
	{
		this.hostEnvironment = hostEnvironment;
	}

	protected override bool ShouldRender() => shouldRender;

	protected override void OnParametersSet()
	{
		if (Include is null)
			return;

		includedEnvironments = Include.Split(',', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);

		shouldRender = includedEnvironments.Contains(hostEnvironment.Environment);
	}

	protected override void BuildRenderTree(RenderTreeBuilder builder)
	{
		if (shouldRender)
			builder.AddContent(0, ChildContent);
	}
}
