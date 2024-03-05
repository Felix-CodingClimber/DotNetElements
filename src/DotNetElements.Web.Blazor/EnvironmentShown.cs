using Microsoft.AspNetCore.Components.Rendering;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

namespace DotNetElements.Web.Blazor;

public static class Environment
{
    public const string Development = nameof(Development);
    public const string Staging = nameof(Staging);
    public const string Test = nameof(Test);
    public const string Production = nameof(Production);
}

public partial class EnvironmentShown : ComponentBase
{
    [Inject]
    private IWebAssemblyHostEnvironment hostEnvironment { get; set; } = default!;

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

