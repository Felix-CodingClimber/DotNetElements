// Modified version of https://github.com/Chronostasys/Blazor.Cropper
//
// Date of source:           05.03.2024
// Commit version of source: Latest commit 523c2bb on Aug 20, 2023
// 
// Original License:
//
// The MIT License
// 
// Copyright(c) 2020 Chronostasys

namespace DotNetElements.Web.Blazor.ImageCropper;
// using SixLabors.ImageSharp; // todo

/// <summary>
/// Crop metadata
/// </summary>
public class CropInfo
{
    /// <summary>
    /// Crop zone in pixel (for original image)
    /// </summary>
    public Rectangle Rectangle { get; init; }
    /// <summary>
    /// ratio
    /// </summary>
    public double Ratio { get; init; }
    /// <summary>
    /// resizeprop
    /// </summary>
    public double ResizeProp { get; init; }
    /// <summary>
    /// Get init parameters from this function to restore the cropper state
    /// note that the data returned from this function is in physical pixel
    /// </summary>
    /// <returns></returns>
    public (int offsetX, int offsetY, int initX, int initY, double ratio) GetInitParams()
    {
        return ((int)(Rectangle.X / ResizeProp), (int)(Rectangle.Y / ResizeProp), (int)(Rectangle.Width / ResizeProp), (int)(Rectangle.Height / ResizeProp), Ratio);
    }
}
