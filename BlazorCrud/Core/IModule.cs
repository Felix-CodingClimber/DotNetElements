namespace BlazorCrud.Core;

public interface IModule
{
	IServiceCollection RegisterModules(IServiceCollection services);

	IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints);
}
