using DotNetElements.CrudExample.Components.Components;
using MudBlazor;

namespace DotNetElements.CrudExample.Components.Utils;

public static class DialogeServiceExtensions
{
	public static async Task<Result> ShowDeleteDialog(this IDialogService dialogService, string title, string itemValue, string itemLabel)
	{
		var dialogParameters = new DialogParameters<DeleteDialog>
		{
			{ x => x.ItemValue, itemValue },
			{ x => x.ItemLabel, itemLabel }
		};

		IDialogReference dialog = await dialogService.ShowAsync<DeleteDialog>(title, dialogParameters);
		DialogResult result = await dialog.Result;

		return result.Canceled ? Result.Fail("Canceled by user") : Result.Ok();
	}
}
