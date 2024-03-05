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

internal enum MoveDir
{
    Up,
    Down,
    Left,
    Right,
    UpLeft,
    UpRight,
    DownLeft,
    DownRight,
    UnKnown
}