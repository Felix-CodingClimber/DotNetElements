using DotNetElements.AppFramework.AspNet.Modules;
using Microsoft.AspNetCore.Builder;
using Serilog;

namespace DotNetElements.AppFramework.AspNet;

public static class WebApplicationExtensions
{
    public static async Task UseAppFrameworkAsync(this WebApplication app)
    {
        app.UseSerilogRequestLogging();

        app.MapModuleEndpoints();

        await app.InitModulesAsync();
    }
}
