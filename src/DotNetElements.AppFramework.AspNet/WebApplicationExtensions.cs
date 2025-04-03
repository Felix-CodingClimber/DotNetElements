using DotNetElements.AppFramework.AspNet.Modules;
using Microsoft.AspNetCore.Builder;
using Serilog;

namespace DotNetElements.AppFramework.AspNet;

public static class WebApplicationExtensions
{
    public static WebApplication UseAppFramework(this WebApplication app)
    {
        app.UseSerilogRequestLogging();

        app.MapModuleEndpoints();

        return app;
    }
}
