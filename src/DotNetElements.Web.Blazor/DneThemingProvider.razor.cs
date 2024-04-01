using System.Text;

namespace DotNetElements.Web.Blazor;

partial class DneThemingProvider : MudThemingProvider
{
    protected override void GenerateTheme(StringBuilder theme)
    {
        base.GenerateTheme(theme);

        theme.AppendLine($"{DnePalette.DiffLineUnchanged}: {(IsDarkMode ? DnePalette.DiffLineUnchangedDark : DnePalette.DiffLineUnchangedLight)};");
        theme.AppendLine($"{DnePalette.DiffLineOld}: {(IsDarkMode ? DnePalette.DiffLineOldDark : DnePalette.DiffLineOldLight)};");
        theme.AppendLine($"{DnePalette.DiffLineNew}: {(IsDarkMode ? DnePalette.DiffLineNewDark : DnePalette.DiffLineNewLight)};");
        theme.AppendLine($"{DnePalette.DiffPieceDeleted}: {(IsDarkMode ? DnePalette.DiffPieceDeletedDark : DnePalette.DiffPieceDeletedLight)};");
        theme.AppendLine($"{DnePalette.DiffPieceInserted}: {(IsDarkMode ? DnePalette.DiffPieceInsertedDark : DnePalette.DiffPieceInsertedLight)};");
    }
}
