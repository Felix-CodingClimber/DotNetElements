using System.Reflection;
using DotNetElements.Core;
using Microsoft.Extensions.DependencyInjection;

namespace DotNetElements.AspNetCore.Extensions;

public static class ServiceCollectionExtensions
{
	public static IReadOnlyList<IModule>? RegisteredModules { get; private set; }

	public static IServiceCollection RegisterModules(this IServiceCollection services, Assembly moduleAssembly)
	{
		IEnumerable<IModule> modules = DiscoverModules(moduleAssembly);
		List<IModule> registeredModules = [];

		foreach (IModule module in modules)
		{
			module.RegisterModules(services);
			registeredModules.Add(module);
		}

		RegisteredModules = registeredModules;

		return services;
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
