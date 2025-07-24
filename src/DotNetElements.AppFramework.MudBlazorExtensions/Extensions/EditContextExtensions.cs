using System.Diagnostics;
using Microsoft.AspNetCore.Components.Forms;

namespace DotNetElements.AppFramework.MudBlazorExtensions.Extensions;

public static class EditContextExtensions
{
    [Conditional("DEBUG")]
    public static void LogDebugInfo(this EditContext? editContext)
    {
        if (editContext is null)
            return;

        IEnumerable<string> messages = editContext.GetValidationMessages();

        if (!messages.Any())
            return;

        Console.WriteLine($"DEBUG EditContext validation messages. Context: {editContext.Model.GetType()}");

        foreach (string message in messages)
            Console.WriteLine(message);
    }
}
