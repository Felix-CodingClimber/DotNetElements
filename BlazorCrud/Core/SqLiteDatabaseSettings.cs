﻿namespace BlazorCrud.Core;

public abstract class SqLiteDatabaseSettings
{
	[Required]
	public required string FilePath { get; set; }
}
