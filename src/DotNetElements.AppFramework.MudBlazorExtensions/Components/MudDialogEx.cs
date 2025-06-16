namespace DotNetElements.AppFramework.MudBlazorExtensions.Components;

public sealed class MudDialogEx : MudDialog
{
    public const string DefaultTitleClass = "pa-4";
    public const string DefaultContentClass = "pa-4 ma-0";
    public const string DefaultContentStyle = "border-top: 1px solid var(--mud-palette-lines-default); border-top-left-radius: 0; border-top-right-radius: 0;";
    public const string DefaultActionsClass = "px-4 pb-4";

    public MudDialogEx()
    {
        Gutters = false;
        TitleClass = DefaultTitleClass;
        ContentClass = DefaultContentClass;
        ContentStyle = DefaultContentStyle;
        ActionsClass = DefaultActionsClass;
    }
}
