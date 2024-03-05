namespace DotNetElements.Web.Blazor;

public class DneDataAnnotationsValidator : DataAnnotationsValidator
{
#if DEBUG
    [CascadingParameter] EditContext? DebugEditContext { get; set; }

    protected override void OnInitialized()
    {
        base.OnInitialized();

        if (DebugEditContext is null)
        {
            throw new InvalidOperationException($"{nameof(DneDataAnnotationsValidator)} requires a cascading " +
                $"parameter of type {nameof(EditContext)}. For example, you can use {nameof(DneDataAnnotationsValidator)} " +
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
