namespace DotNetElements.Core.StringDiff;

internal class LineChunker : IChunker
{
    private static readonly string[] LineSeparators = ["\r\n", "\r", "\n"];

    public string[] Chunk(string text)
    {
        return text.Split(LineSeparators, StringSplitOptions.None);
    }
}