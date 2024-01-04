namespace BlazorCrud.Core;

public class ModelWithDetails<TModel, TDetails>
	where TDetails : ModelDetails
{
	public TModel Value { get; private init; }

	public TDetails? Details { get; set; }

	public bool DetailsShown { get; set; }

	public ModelWithDetails(TModel value)
	{
		Value = value;
	}
}
