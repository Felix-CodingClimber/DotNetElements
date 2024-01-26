using DotNetElements.Core;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace DotNetElements.Web.AspNetCore.Extensions;

public static class WebApplicationBuilderExtensions
{
	public static WebApplicationBuilder AddSettings<T>(this WebApplicationBuilder builder)
		where T : class, ISettings
	{
		string sectionName = T.ConfigurationSectionName;

		ArgumentNullException.ThrowIfNull(sectionName);

		builder.Services.AddOptions<T>()
						.Bind(builder.Configuration.GetSection(sectionName))
						.ValidateDataAnnotations()
						.ValidateOnStart();

		return builder;
	}
}
