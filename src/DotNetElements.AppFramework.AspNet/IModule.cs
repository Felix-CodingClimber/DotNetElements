using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace DotNetElements.AppFramework.AspNet;

public interface IModule
{
    void RegisterModules(WebApplicationBuilder builder);

    void MapEndpoints(IEndpointRouteBuilder endpoints);
}
