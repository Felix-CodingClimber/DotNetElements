using DotNetElements.AppFramework.AspNet;
using DotNetElements.AppFramework.AspNet.Modules;
using DotNetElements.AppFramework.Development;
using DotNetElements.Samples.AppFramework.WebApi;
using Scalar.AspNetCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.AddAppFramework(typeof(Program).Assembly);
builder.Services.AddOpenApi();
builder.Services.AddAppFrameworkDbContext<AppDbContext>();

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddFakeUserProvider(new Guid("D8EFD474-43D2-48E5-8885-81E55DDCEB97"), "fakeUser@email.com");
}

WebApplication app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

await app.UseAppFrameworkAsync();

app.MigrateDatabase<AppDbContext>();

app.Run();
