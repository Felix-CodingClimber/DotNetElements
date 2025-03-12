using DotNetElements.AppFramework.AspNet.Modules;
using Microsoft.AspNetCore.Builder;

namespace DotNetElements.AppFramework.AspNet;

public static class WebApplicationExtensions
{
    public static WebApplication UseAppFramework(this WebApplication app)
    {
        app.MapModuleEndpoints();

        return app;
    }
}
