namespace DotNetElements.Core.StringDiff;

internal class DelimiterChunker : IChunker
{
    private readonly char[] delimiters;

    public DelimiterChunker(char[] delimiters)
    {
        ThrowIf.CollectionIsNullOrEmpty(delimiters);

        this.delimiters = delimiters;
    }

    public string[] Chunk(string str)
    {
        List<string> list = [];
        int begin = 0;
        bool processingDelimiter = false;
        int delimiterBegin = 0;

        for (int i = 0; i < str.Length; i++)
        {
            if (Array.IndexOf(delimiters, str[i]) != -1)
            {
                if (i >= str.Length - 1)
                {
                    if (processingDelimiter)
                    {
                        list.Add(str[delimiterBegin..(i + 1)]);
                    }
                    else
                    {
                        list.Add(str[begin..i]);
                        list.Add(str.Substring(i, 1));
                    }
                }
                else
                {
                    if (!processingDelimiter)
                    {
                        // Add everything up to this delimiter as the next chunk (if there is anything)
                        if (i - begin > 0)
                            list.Add(str[begin..i]);

                        processingDelimiter = true;
                        delimiterBegin = i;
                    }
                }

                begin = i + 1;
            }
            else
            {
                if (processingDelimiter)
                {
                    if (i - delimiterBegin > 0)
                        list.Add(str[delimiterBegin..i]);

                    processingDelimiter = false;
                }

                // If we are at the end, add the remaining as the last chunk
                if (i >= str.Length - 1)
                    list.Add(str[begin..(i + 1)]);
            }
        }

        return [.. list];
    }
}