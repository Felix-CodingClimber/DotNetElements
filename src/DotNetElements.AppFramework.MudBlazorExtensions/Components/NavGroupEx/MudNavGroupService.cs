using System.Timers;

namespace DotNetElements.AppFramework.MudBlazorExtensions.Components.NavGroupEx;

public sealed class MudNavGroupService : IDisposable
{
    private IMudNavGroup? currentOpen;
    private System.Timers.Timer? autoCloseTimer;

    // todo make configurable
    private const int autoCloseDelayMs = 1500;

    public void Dispose()
    {
        StopAutoCloseTimer();
    }

    public void ToggleOpen(IMudNavGroup component)
    {
        if (currentOpen == component)
        {
            Close();
            return;
        }

        currentOpen?.Close();
        currentOpen = component;
        currentOpen.Open();

        StartAutoCloseTimer();
    }

    public void Close()
    {
        StopAutoCloseTimer();
        currentOpen?.Close();
        currentOpen = null;
    }

    public void PauseAutoClose()
    {
        StopAutoCloseTimer();
    }

    public void ResumeAutoClose()
    {
        if (currentOpen is null)
            return;

        StartAutoCloseTimer();
    }

    private void StartAutoCloseTimer()
    {
        StopAutoCloseTimer();

        autoCloseTimer = new System.Timers.Timer(autoCloseDelayMs);
        autoCloseTimer.Elapsed += OnAutoCloseTimerElapsed;
        autoCloseTimer.AutoReset = false;
        autoCloseTimer.Start();
    }

    private void StopAutoCloseTimer()
    {
        if (autoCloseTimer is null)
            return;

        autoCloseTimer.Stop();
        autoCloseTimer.Elapsed -= OnAutoCloseTimerElapsed;
        autoCloseTimer.Dispose();
        autoCloseTimer = null;
    }

    private void OnAutoCloseTimerElapsed(object? sender, ElapsedEventArgs e)
    {
        Close();
    }
}