using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace DotNetElements.Web.AspNetCore;

public interface IModule
{
    WebApplicationBuilder RegisterModules(WebApplicationBuilder builder);

	IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints);
}
