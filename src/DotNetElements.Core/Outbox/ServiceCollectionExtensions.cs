using Microsoft.Extensions.DependencyInjection;
using NCronJob;

namespace DotNetElements.Core;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddOutbox<TDbContext>(this IServiceCollection services, Action<OutboxOptions> configureOptions)
        where TDbContext : DbContext, IDbSetOutbox
    {
        OutboxOptions userOptions = new();
        configureOptions(userOptions);

        if (!MiniValidator.TryValidate(userOptions, out List<ValidationResult> validationResults))
        {
            string errorMessage = string.Join(", ", validationResults.Select(result => $"{result.MemberNames.First()}: {result.ErrorMessage}"));
            throw new ArgumentException($"Invalid {nameof(OutboxOptions)} configuration: {errorMessage}");
        }

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
}
