namespace DotNetElements.AppFramework.MudBlazorExtensions.Util;

public sealed class DialogLoadArgs()
{
    public bool HasError { get; private set; }
    public string? ErrorMessage { get; private set; }

    public void ReturnError(string message)
    {
        HasError = true;
        ErrorMessage = message;
    }
}

public sealed record DialogSubmitArgs()
{
    public bool Cancel { get; set; }
}

public sealed record DialogSubmitArgs<TReturnValue>()
{
    public TReturnValue? ReturnValue { get; set; }
    public bool Cancel { get; set; }
}
