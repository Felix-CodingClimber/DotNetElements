using Microsoft.JSInterop;

namespace DotNetElements.AppFramework.MudBlazorExtensions.Services;

public interface IClipboardService
{
	Task CopyToClipboardAsync(string text);
	//Task CopyToClipboardCompatibilityAsync(string containerElementId);
}

public sealed class ClipboardService : IClipboardService
{
	private readonly IJSRuntime jsInterop;

	public ClipboardService(IJSRuntime jsInterop)
	{
		this.jsInterop = jsInterop;
	}

	public async Task CopyToClipboardAsync(string text)
	{
		await jsInterop.InvokeVoidAsync("navigator.clipboard.writeText", text);
	}

	//public async Task CopyToClipboardCompatibilityAsync(string containerElementId)
	//{
	//	await jsInterop.InvokeVoidAsync("CosAppWeb.copyToClipboard", containerElementId);
	//}
}
