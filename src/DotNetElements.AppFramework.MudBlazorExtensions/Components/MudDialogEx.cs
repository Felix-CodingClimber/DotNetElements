namespace DotNetElements.AppFramework.MudBlazorExtensions.Components;

public sealed class MudDialogEx : MudDialog
{
    protected const string DefaultTitleClass = "pa-4";
    protected const string DefaultContentClass = "pa-4 ma-0";
    protected const string DefaultContentStyle = "border-top: 1px solid var(--mud-palette-lines-default); border-top-left-radius: 0; border-top-right-radius: 0;";
    protected const string DefaultActionsClass = "px-4 pb-4";

    public MudDialogEx()
    {
        Gutters = false;
        TitleClass = DefaultTitleClass;
        ContentClass = DefaultContentClass;
        ContentStyle = DefaultContentStyle;
        ActionsClass = DefaultActionsClass;
    }
}
