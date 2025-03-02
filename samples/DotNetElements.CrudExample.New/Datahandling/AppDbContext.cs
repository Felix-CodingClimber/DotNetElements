using DotNetElements.CrudExample.Modules.BlogPostModule;
using DotNetElements.CrudExample.Modules.TagModule;

namespace DotNetElements.Datahandling;

public class AppDbContext : SqLiteContext
{
	public DbSet<BlogPost> BlogPosts { get; set; }

	public DbSet<Tag> Tags { get; set; }

	public AppDbContext(IOptions<AppDatabaseSettings> settings) : base(settings.Value)
	{
	}

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
		base.OnConfiguring(optionsBuilder);

		// Only use to debug sql queries
#if DEBUG && true
		optionsBuilder.LogTo(message => System.Diagnostics.Debug.WriteLine(message));
#endif
	}
}
