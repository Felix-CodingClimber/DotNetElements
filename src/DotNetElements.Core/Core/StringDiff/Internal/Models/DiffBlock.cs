namespace DotNetElements.Core.StringDiff;

/// <summary>
/// A block of consecutive edits from A and/or B
/// </summary>
/// <param name="DeleteStartA">Position where deletions in A begin</param>
/// <param name="DeleteCountA">The number of deletions in A</param>
/// <param name="InsertStartB">Position where insertion in B begin</param>
/// <param name="InsertCountB">The number of insertions in B</param>
internal record struct DiffBlock(int DeleteStartA, int DeleteCountA, int InsertStartB, int InsertCountB);