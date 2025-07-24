using DotNetElements.AppFramework.MudBlazorExtensions.Extensions;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;

namespace DotNetElements.AppFramework.MudBlazorExtensions.Components;

public sealed class DebugDataAnnotationsValidator : DataAnnotationsValidator
{
#if DEBUG
    [CascadingParameter]
    EditContext? DebugEditContext { get; set; }

    protected override void OnInitialized()
    {
        base.OnInitialized();

        if (DebugEditContext is null)
        {
            throw new InvalidOperationException($"{nameof(DebugDataAnnotationsValidator)} requires a cascading " +
                $"parameter of type {nameof(EditContext)}. Normally, you would use a {nameof(DebugDataAnnotationsValidator)} " +
                $"inside an EditForm.");
        }

        DebugEditContext.OnValidationRequested += DebugEditContext_OnValidationRequested;
    }

    protected override void Dispose(bool disposing)
    {
        if (disposing && DebugEditContext is not null)
            DebugEditContext.OnValidationRequested -= DebugEditContext_OnValidationRequested;
    }

    private void DebugEditContext_OnValidationRequested(object? sender, ValidationRequestedEventArgs e)
    {
        DebugEditContext.LogDebugInfo(); // Debug only
    }
#endif
}
