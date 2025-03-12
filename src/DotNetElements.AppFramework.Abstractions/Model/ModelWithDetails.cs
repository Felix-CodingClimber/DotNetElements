namespace DotNetElements.AppFramework.Abstractions.Model;

public class ModelWithDetails<TModel, TDetails> : ModelWithDetails<TModel>
    where TDetails : ModelDetails
{
    public TDetails? Details { get; set; }

    public ModelWithDetails(TModel value) : base(value)
    {
    }
}

public class ModelWithDetails<TModel>
{
    public TModel Value { get; set; }

    public bool DetailsShown { get; set; }

    public ModelWithDetails(TModel value)
    {
        Value = value;
    }

    public void ToggleDetailsShown() => DetailsShown = !DetailsShown;
}
