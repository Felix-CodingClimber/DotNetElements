namespace DotNetElements.Core.Test.TestData;

public class TestDbContext : DbContext
{
	public DbSet<BlogPost> BlogPosts { get; set; }

	public DbSet<Tag> Tags { get; set; }

    public TestDbContext(DbContextOptions options) : base(options)
    {

    }
}
