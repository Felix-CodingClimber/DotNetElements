using DotNetElements.Datahandling;
using MudBlazor.Services;
using DotNetElements.CrudExample.Modules.BlogPostModule;
using DotNetElements.CrudExample.New.Components;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
	.AddInteractiveServerComponents();

builder.Services.AddMudServices();

builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton<TimeProvider>(TimeProvider.System);
//builder.Services.AddScoped<ICurrentUserProvider, CurrentUserProviderWeb>(); // todo
builder.Services.AddScoped<ICurrentUserProvider>(provider => new FakeCurrentUserProviderWeb(new Guid("e8d118e0-18c6-4fff-9d86-e91a915d8198"))); // todo debug only

builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddDatabaseMigrationService<AppDbContext>();
builder.AddSettings<AppDatabaseSettings>();

builder.RegisterModules(typeof(BlogPostModule).Assembly);

WebApplication app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	app.UseExceptionHandler("/Error", createScopeForErrors: true);
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>()
	.AddInteractiveServerRenderMode();

app.MapEndpoints();

app.MigrateDatabase<AppDbContext>();

app.Run();
