using Microsoft.AspNetCore.Components.Web;

namespace DotNetElements.Web.Blazor;

public class CrudEditDialog<TModel, TEditModel> : MudDialog
{
	[Inject]
	protected HttpClient HttpClient { get; set; } = default!;

	[CascadingParameter]
	protected MudDialogInstance Dialog { get; set; } = default!;

	[Parameter, EditorRequired]
	public TEditModel Model { get; set; } = default!;

	[Parameter, EditorRequired]
	public EditContext EditContext { get; set; } = default!;

	[Parameter]
	public string? ApiEndpoint { get; set; }

	[Parameter]
	public bool IsEditMode { get; set; }

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
				childBuilder.AddContent(9, "Save");
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
				childBuilder.AddContent(15, "Cancel");
			}));
		builder.CloseComponent();
		builder.CloseElement();
	};

	public CrudEditDialog()
	{
		DialogActions = DefaultDialogActions;
	}

	private async Task OnSubmit()
	{
		bool isValid = EditContext?.Validate() is true;

		if (!isValid)
			return;

		Result<TModel> result;

		if (IsEditMode)
			result = await HttpClient.PostAsJsonWithResultAsync<TEditModel, TModel>(ApiEndpoint, Model!);
		else
			result = await HttpClient.PutAsJsonWithResultAsync<TEditModel, TModel>(ApiEndpoint, Model!);

		Dialog?.Close(DialogResult.Ok(result));
	}

	private void OnCancel()
	{
		Dialog?.Cancel();
	}
}
