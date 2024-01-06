using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;

namespace DotNetElements.Core;

public interface IModule
{
	IServiceCollection RegisterModules(IServiceCollection services);

	IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints);
}
