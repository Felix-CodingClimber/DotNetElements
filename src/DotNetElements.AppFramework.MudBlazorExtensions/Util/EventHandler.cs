using Microsoft.AspNetCore.Components;

namespace DotNetElements.AppFramework.MudBlazorExtensions.Util;

[EventHandler("ontextpaste", typeof(TextPasteEventArgs), enableStopPropagation: true, enablePreventDefault: true)]
public static class EventHandlers;

public class TextPasteEventArgs : EventArgs
{
    public string? PastedData { get; set; }
}
