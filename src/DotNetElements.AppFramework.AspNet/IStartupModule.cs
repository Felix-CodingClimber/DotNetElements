using Microsoft.AspNetCore.Builder;

namespace DotNetElements.AppFramework.AspNet;

// todo better error handling
public interface IStartupModule
{
    Task InitAsync(WebApplication app);
}
