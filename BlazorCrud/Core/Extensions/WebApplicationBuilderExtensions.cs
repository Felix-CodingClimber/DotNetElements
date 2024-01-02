namespace BlazorCrud.Core.Extensions;

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
