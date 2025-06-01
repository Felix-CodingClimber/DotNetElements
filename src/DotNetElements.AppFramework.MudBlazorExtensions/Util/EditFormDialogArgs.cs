using Microsoft.AspNetCore.Components.Forms;

namespace DotNetElements.AppFramework.MudBlazorExtensions.Util;

public sealed record EditFormDialogArgs<T, TReturnValue>(T Value, EditContext EditContext)
{
    public bool Cancel { get; set; }
    public TReturnValue? ReturnValue { get; set; }

    public bool IsValid => EditContext.Validate();
}
