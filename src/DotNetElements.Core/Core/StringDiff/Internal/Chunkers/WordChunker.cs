namespace DotNetElements.Core.StringDiff;

internal class WordChunker : DelimiterChunker, IChunker
{
    private static readonly char[] WordSeparators = [' ', '\t', '.', '(', ')', '{', '}', ',', '!', '?', ';'];

    public WordChunker() : base(WordSeparators) { }
}