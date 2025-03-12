using Microsoft.Extensions.DependencyInjection;
using NCronJob;

namespace DotNetElements.AppFramework;

// todo we need to expand this concept to allow for multiple db contexts
// - each db context should have its own outbox
// - each db context should have a option to define the message assembly
public static partial class IAppFrameworkBuilderExtensions
{
    public static IServiceCollection AddOutbox<TDbContext>(this IServiceCollection services, Action<OutboxOptions> configureOptions)
        where TDbContext : DbContext, IDbSetOutbox
    {
        OutboxOptions userOptions = new();
        configureOptions(userOptions);

        MiniValidator.ThrowIfNotValid(userOptions);

        services.AddOptions<OutboxOptions>().Configure(options =>
        {
            options.MessagesAssembly = userOptions.MessagesAssembly;
            options.MaxRetryCount = userOptions.MaxRetryCount;
            options.JobInterval = userOptions.JobInterval;
        });

        services.Configure<OutboxOptions>(configureOptions);
        services.AddScoped<IOutboxService, OutboxService<TDbContext>>();

        services.AddNCronJob(options =>
        {
            string cronExpression = userOptions.JobInterval.Unit is IntervalUnit.Seconds
                ? $"*/{userOptions.JobInterval.Value} * * * * *"
                : $"*/{userOptions.JobInterval.Value} * * * *";
            options.AddJob<OutboxServiceJob>(job => job.WithCronExpression(cronExpression));
        });

        return services;
    }

    public static IServiceCollection AddOutboxMessageProcessor<TService, TMessage>(this IServiceCollection services)
        where TService : OutboxMessageProcessor<TMessage>
    {
        services.AddScoped<OutboxMessageProcessor<TMessage>, TService>();

        return services;
    }
}
