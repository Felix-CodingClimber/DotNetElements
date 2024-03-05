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

using Microsoft.JSInterop;

namespace DotNetElements.Web.Blazor.ImageCropper;

/// <summary>
/// js interop methods
/// </summary>
public static class JSInterop
{
    /// <summary>
    /// set html img element to display the image
    /// this function is the preferred way to display the crop result in dotnet 6
    /// </summary>
    /// <param name="js"></param>
    /// <param name="bin">image bytes</param>
    /// <param name="imgid">img element id</param>
    /// <param name="format">like image/jpg</param>
    /// <returns></returns>
    public static ValueTask SetImageAsync(this IJSRuntime js,byte[] bin,string imgid, string format)
    {
        return js.InvokeVoidAsync("setSrc", bin, imgid,format);
    }

    public static ValueTask LogAsync(this IJSRuntime js,params object[] objs)
    {
        return js.InvokeVoidAsync("console.log", objs);
    }
}
