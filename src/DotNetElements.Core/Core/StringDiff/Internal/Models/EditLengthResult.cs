namespace DotNetElements.Core.StringDiff;

internal enum Edit
{
    None,
    DeleteRight,
    DeleteLeft,
    InsertDown,
    InsertUp
}

internal record struct EditLengthResult(int EditLength, int StartX, int EndX, int StartY, int EndY, Edit LastEdit);