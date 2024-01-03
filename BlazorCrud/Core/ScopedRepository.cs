namespace BlazorCrud.Core;

public sealed class ScopedRepository<TRepository, TEntity, TEditModel, TKey> : IDisposable
	where TEntity : Entity<TKey>, IUpdatableFromModel<TEditModel>
	where TKey : notnull
	where TRepository : IRepository<TEntity, TEditModel, TKey>
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
