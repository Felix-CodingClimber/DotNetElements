using Microsoft.AspNetCore.Components;

namespace DotNetElements.AppFramework.MudBlazorExtensions.Util;

[EventHandler("ontextpaste", typeof(TextPasteEventArgs), enableStopPropagation: true, enablePreventDefault: true)]
[EventHandler("onbeforeinput", typeof(BeforeInputEventArgs), enableStopPropagation: true, enablePreventDefault: true)]
public static class EventHandlers;

public sealed class TextPasteEventArgs : EventArgs
{
    public string? PastedData { get; set; }
}

public sealed class BeforeInputEventArgs : EventArgs
{
    public string? Data { get; set; }
}