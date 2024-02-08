using System.Diagnostics;
using System.Runtime.CompilerServices;

namespace DotNetElements.Web.MudBlazor.Extensions;

public static class EditContextExtensions
{
    [Conditional("DEBUG")]
    public static void LogDebugInfo(this EditContext? editContext, [CallerMemberName]string? callerMemberName = null)
    {
        if (editContext is null)
            return;

        Console.WriteLine($"DEBUG EditContext validation messages. Context: {callerMemberName}");

        foreach (string message in editContext.GetValidationMessages())
        {
            Console.WriteLine(message);
        }
    }
}
