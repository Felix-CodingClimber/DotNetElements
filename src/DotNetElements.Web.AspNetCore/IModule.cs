using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;

namespace DotNetElements.Web.AspNetCore;

public interface IModule
{
	IServiceCollection RegisterModules(IServiceCollection services);

	IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints);
}
