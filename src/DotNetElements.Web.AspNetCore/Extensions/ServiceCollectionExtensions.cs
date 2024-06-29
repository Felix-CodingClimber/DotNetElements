using System.Reflection;
using DotNetElements.Core;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace DotNetElements.Web.AspNetCore.Extensions;

public static class ServiceCollectionExtensions
{
	public static IReadOnlyList<IModule>? RegisteredModules { get; private set; }

	public static WebApplicationBuilder RegisterModules(this WebApplicationBuilder builder, Assembly moduleAssembly)
	{
		IEnumerable<IModule> modules = DiscoverModules(moduleAssembly);
		List<IModule> registeredModules = [];

		foreach (IModule module in modules)
		{
			module.RegisterModules(builder);
			registeredModules.Add(module);
		}

		RegisteredModules = registeredModules;

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
