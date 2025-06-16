namespace DotNetElements.AppFramework.MudBlazorExtensions.Util;

public sealed class StatusListItem
{
    public StatusListStatus Status { get; set; }
    public string? Message { get; set; }
    public string? ExternalLink { get; set; }

    public string Label { get; private init; }
    public List<StatusListItem>? Children { get; private init; }

    public StatusListItem(string label, StatusListStatus status, string? message = null, string? externalLink = null, List<StatusListItem>? children = null)
    {
        Label = label;
        Status = status;
        Message = message;
        ExternalLink = externalLink;
        Children = children;
    }

    public string GetIcon()
    {
        return Status switch
        {
            StatusListStatus.Pending => Icons.Material.Outlined.RadioButtonUnchecked,
            StatusListStatus.Success => Icons.Material.Outlined.CheckCircleOutline,
            StatusListStatus.Warning => Icons.Material.Outlined.Warning,
            StatusListStatus.Error => Icons.Material.Outlined.Error,
            _ => throw new NotImplementedException(nameof(Status))
        };
    }

    public Color GetColor()
    {
        return Status switch
        {
            StatusListStatus.Pending => Color.Default,
            StatusListStatus.Success => Color.Success,
            StatusListStatus.Warning => Color.Warning,
            StatusListStatus.Error => Color.Error,
            _ => throw new NotImplementedException(nameof(Status))
        };
    }

    public bool ShouldShowExternalLink()
    {
        return ExternalLink is not null && Status is StatusListStatus.Error or StatusListStatus.Warning;
    }
}
