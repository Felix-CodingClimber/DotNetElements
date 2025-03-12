using DotNetElements.Samples.AppFramework.WebApi.Modules.Categories;
using DotNetElements.Samples.AppFramework.WebApi.Modules.ToDoItems;

namespace DotNetElements.Samples.AppFramework.WebApi;

internal sealed class AppDbContext : DbContext
{
    public DbSet<ToDoItem> ToDoItems { get; set; }
    public DbSet<Category> Categories { get; set; }

    public AppDbContext(DbContextOptions options) : base(options)
    {

    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder
            .UseSqlite("DataSource=Test.db");
    }
}
