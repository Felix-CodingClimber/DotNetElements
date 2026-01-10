using DotNetElements.AppFramework.Abstractions.Auth;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace DotNetElements.AppFramework.Development;

public static partial class ServiceCollectionExtensions
{
    public static IServiceCollection AddFakeUserProvider(this IServiceCollection services, Guid fakeUserId, string fakeUserEmail)
    {
        services.Replace(ServiceDescriptor.Scoped<ICurrentUserProvider>(_ => new FakeCurrentUserProvider(fakeUserId, fakeUserEmail)));

        return services;
    }
}
