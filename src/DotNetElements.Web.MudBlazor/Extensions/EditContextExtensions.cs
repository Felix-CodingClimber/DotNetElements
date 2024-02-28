using System.Diagnostics;
using System.Runtime.CompilerServices;

namespace DotNetElements.Web.MudBlazor.Extensions;

public static class EditContextExtensions
{
    [Conditional("DEBUG")]
    public static void LogDebugInfo(this EditContext? editContext)
    {
        if (editContext is null)
            return;

        Console.WriteLine($"DEBUG EditContext validation messages. Context: {editContext.Model.GetType()}");

        foreach (string message in editContext.GetValidationMessages())
        {
            Console.WriteLine(message);
        }
    }
}
