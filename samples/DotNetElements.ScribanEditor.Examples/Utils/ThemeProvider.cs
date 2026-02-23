namespace DotNetElements.ScribanEditor.Examples.Utils;

public interface IThemeProvider
{
    bool IsDarkModeActive { get; }
    event EventHandler? ThemeChanged;

    void SetIsDarkModeActive(bool isDarkModeActive);
}

public sealed class ThemeProvider : IThemeProvider
{
    public bool IsDarkModeActive { get; private set; }
    public event EventHandler? ThemeChanged;

    public void SetIsDarkModeActive(bool isDarkModeActive)
    {
        if (IsDarkModeActive == isDarkModeActive)
            return;

        IsDarkModeActive = isDarkModeActive;
        ThemeChanged?.Invoke(this, EventArgs.Empty);
    }
}