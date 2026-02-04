using Microsoft.AspNetCore.Components;

namespace DotNetElements.AppFramework.MudBlazorExtensions.Components;

public sealed class RedirectToLogin : ComponentBase
{
    [Parameter, EditorRequired]
    public string SignInUrl { get; set; } = default!;

    private readonly NavigationManager navigationManager;

    public RedirectToLogin(NavigationManager navigationManager)
    {
        this.navigationManager = navigationManager;
    }

    protected override void OnInitialized()
    {
        navigationManager.NavigateTo(SignInUrl, forceLoad: false);
    }
}
