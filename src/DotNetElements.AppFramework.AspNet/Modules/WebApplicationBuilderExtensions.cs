using System.Reflection;
using Microsoft.AspNetCore.Builder;

namespace DotNetElements.AppFramework.AspNet.Modules;

public static class WebApplicationBuilderExtensions
{
    public static IReadOnlyList<IModule> RegisteredModules => registeredModules;
    private static readonly List<IModule> registeredModules = [];

    public static WebApplicationBuilder RegisterModules(this WebApplicationBuilder builder, Assembly moduleAssembly)
    {
        IEnumerable<IModule> modules = DiscoverModules(moduleAssembly);

        foreach (IModule module in modules)
        {
            module.RegisterModules(builder);
            registeredModules.Add(module);
        }

        return builder;
    }

    // todo replace with source generated version
    private static IEnumerable<IModule> DiscoverModules(Assembly moduleAssembly)
    {
        return moduleAssembly.GetTypes()
            .Where(p => p.IsAssignableTo(typeof(IModule)) && p.IsClass && !p.IsAbstract)
            .Select(Activator.CreateInstance)
            .Cast<IModule>();
    }
}
