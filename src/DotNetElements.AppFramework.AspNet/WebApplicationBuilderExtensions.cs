using System.Reflection;
using DotNetElements.AppFramework.Abstractions.Auth;
using DotNetElements.AppFramework.AspNet.Modules;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace DotNetElements.AppFramework.AspNet;

public static class WebApplicationBuilderExtensions
{
    public static WebApplicationBuilder AddAppFramework(this WebApplicationBuilder builder, Assembly moduleAssembly)
    {
        builder.Services.AddAppFrameworkBase();

        builder.Services.AddHttpContextAccessor();
        builder.Services.AddScoped<ICurrentUserProvider, CurrentUserProvider>();
        builder.Services.AddSerilog((services, options) =>
        {
            options.ReadFrom.Configuration(builder.Configuration)
                   .Filter.ByExcluding(logEvent => // todo only in development, make configurable
                    {
                        if (logEvent.Properties.TryGetValue("RequestPath", out var value))
                        {
                            string valueString = value.ToString();

                            return valueString.StartsWith("\"/_framework")
                                || valueString.StartsWith("\"/_content");
                        }

                        return false;
                    });
        });

        builder.RegisterModules(moduleAssembly);

        return builder;
    }
}
