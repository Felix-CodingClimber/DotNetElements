using Microsoft.AspNetCore.Components.Web;

namespace DotNetElements.Web.Blazor;

public class CrudEditDialog<TModel, TEditModel> : MudDialog
{
	[Inject]
	protected HttpClient HttpClient { get; set; } = default!;

	[CascadingParameter]
	protected IMudDialogInstance Dialog { get; set; } = default!;

	[Parameter, EditorRequired]
	public TEditModel Model { get; set; } = default!;

	[Parameter, EditorRequired]
	public EditContext EditContext { get; set; } = default!;

	[Parameter]
	public string? ApiEndpoint { get; set; }

	[Parameter]
	public bool IsEditMode { get; set; }

	protected string OkButtonText = "Save";
	protected string CancelButtonText = "Cancel";

    private RenderFragment DefaultDialogActions => builder =>
	{
		builder.OpenElement(0, "div");
		builder.AddAttribute(1, "class", "mb-2 mr-3");
		// Submit button
		builder.OpenComponent<MudButton>(2);
		builder.AddComponentParameter(3, "Variant", Variant.Filled);
		builder.AddComponentParameter(4, "ButtonType", ButtonType.Submit);
		builder.AddComponentParameter(5, "Color", Color.Primary);
		builder.AddComponentParameter(6, "Class", "mr-4"); // todo not working
		builder.AddComponentParameter(7, "OnClick", EventCallback.Factory.Create<MouseEventArgs>(this, OnSubmit));
		builder.AddAttribute(8, "ChildContent",
			(RenderFragment)(childBuilder =>
			{
				childBuilder.AddContent(9, OkButtonText);
			}));
		builder.CloseComponent();
		// Cancel button
		builder.OpenComponent<MudButton>(10);
		builder.AddComponentParameter(11, "Variant", Variant.Filled);
		builder.AddComponentParameter(12, "Color", Color.Error);
		builder.AddComponentParameter(13, "OnClick", EventCallback.Factory.Create<MouseEventArgs>(this, OnCancel));
		builder.AddAttribute(14, "ChildContent",
			(RenderFragment)(childBuilder =>
			{
				childBuilder.AddContent(15, CancelButtonText);
			}));
		builder.CloseComponent();
		builder.CloseElement();
	};

	public CrudEditDialog()
	{
		DialogActions = DefaultDialogActions;
	}

    protected async Task OnSubmit()
	{
		OnBeforeValidate();

        bool isValid = EditContext?.Validate() is true;

		if (!isValid)
			return;

        OnAfterValidate();

        Result<TModel> result;

		if (IsEditMode)
			result = await HttpClient.PostAsJsonWithResultAsync<TEditModel, TModel>(ApiEndpoint, Model!);
		else
			result = await HttpClient.PutAsJsonWithResultAsync<TEditModel, TModel>(ApiEndpoint, Model!);

		Dialog?.Close(DialogResult.Ok(result));
	}

	protected void OnCancel()
	{
		Dialog?.Cancel();
	}

	protected virtual void OnBeforeValidate() { }
    protected virtual void OnAfterValidate() { }
}
