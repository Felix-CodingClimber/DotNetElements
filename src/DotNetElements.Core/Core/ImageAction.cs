namespace DotNetElements.Core;

public class ImageAction<TImage>
{
    public TImage? Image { get; set; }
    public Result? Result { get; set; }

    public ImageAction(TImage image)
    {
        Image = image;
    }
}

public class ImageAction<TImage, TReturnValue>
{
    public TImage? Image { get; set; }
    public Result<TReturnValue>? Result { get; set; }

    public ImageAction(TImage image)
    {
        Image = image;
    }
}
