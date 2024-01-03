using System.Diagnostics.CodeAnalysis;

namespace BlazorCrud.Core;

public class ModelWithDetails<TModel, TDetails>
	where TDetails : ModelDetails
{
	public required TModel Value { get; set; }

	public TDetails? Details { get; set; }

	public bool DetailsShown { get; set; }

	[SetsRequiredMembers]
	public ModelWithDetails(TModel value)
	{
		Value = value;
	}
}
