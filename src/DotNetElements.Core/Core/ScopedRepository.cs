using Microsoft.Extensions.DependencyInjection;

namespace DotNetElements.Core;

public sealed class ScopedRepository<TRepository, TEntity, TKey> : IDisposable
	where TEntity : Entity<TKey>
	where TKey : notnull, IEquatable<TKey>
	where TRepository : IRepository<TEntity, TKey>
{
	public TRepository Inner { get; private init; }

	private readonly IServiceScope serviceScope;

	public ScopedRepository(IServiceScope serviceScope, TRepository inner)
	{
		this.serviceScope = serviceScope;
		Inner = inner;
	}

	public void Dispose()
	{
		serviceScope.Dispose();
	}
}
