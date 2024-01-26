namespace DotNetElements.Core;

public class ModelWithDetails<TModel, TDetails>
	where TDetails : ModelDetails
{
	public TModel Value { get; set; }

	public TDetails? Details { get; set; }

	public bool DetailsShown { get; set; }

	public ModelWithDetails(TModel value)
	{
		Value = value;
	}
}
