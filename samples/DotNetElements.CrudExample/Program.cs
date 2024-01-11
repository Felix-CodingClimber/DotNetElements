using DotNetElements.Datahandling;
using MudBlazor.Services;
using DotNetElements.CrudExample.Components;
using DotNetElements.CrudExample.Modules.BlogPostModule;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
	.AddInteractiveServerComponents();

builder.Services.AddMudServices();

builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton<TimeProvider>(TimeProvider.System);
builder.Services.AddScoped<ICurrentUserProvider, CurrentUserProviderWeb>();

builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddDatabaseMigrationService<AppDbContext>();
builder.AddSettings<AppDatabaseSettings>();

builder.Services.RegisterModules(typeof(BlogPostModule).Assembly);

var app = builder.Build();

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
