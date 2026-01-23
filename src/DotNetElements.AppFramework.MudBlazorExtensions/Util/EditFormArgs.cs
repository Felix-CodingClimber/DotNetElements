using Microsoft.AspNetCore.Components.Forms;

namespace DotNetElements.AppFramework.MudBlazorExtensions.Util;

public sealed class EditFormLoadArgs()
{
    public bool HasError { get; private set; }
    public string? ErrorMessage { get; private set; }

    public void ReturnError(string message)
    {
        HasError = true;
        ErrorMessage = message;
    }
}

public sealed record EditFormSubmitArgs<T, TReturnValue>(T Value, EditContext EditContext)
{
    public bool Cancel { get; set; }
    public TReturnValue? ReturnValue { get; set; }

    public bool IsValid => EditContext.Validate();

    public bool EnsureIsValid()
    {
        if (IsValid)
            return true;

        Cancel = true;
        return false;
    }
}
