namespace BlazorCrud.Core;

public sealed class ScopedRepository<TRepository, TEntity, TKey> : IDisposable
	where TEntity : Entity<TKey>
	where TKey : notnull
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

		System.Diagnostics.Debug.WriteLine($"ScopedRepository of type {this.GetType()} disposed!"); // todo debug
	}
}
