namespace DotNetElements.Core;

public abstract class SQLColumnAttribute : ColumnAttribute
{
	public SQLColumnAttribute()
	{
		TypeName = $"{SqlTypeName}";
	}

	protected abstract string SqlTypeName { get; }
}

public abstract class SQLColumnWithLengthAttribute : SQLColumnAttribute
{
	public SQLColumnWithLengthAttribute()
	{
		TypeName = $"{SqlTypeName}(max)";
	}

	private int length;
	public int Length
	{
		get => length;
		set
		{
			if (value < 0)
				throw new ArgumentOutOfRangeException(nameof(value));

			length = value;
			TypeName = $"{SqlTypeName}({value})";
		}
	}
}

/// <summary>
/// Fixed width character string. Max size = 8000 characters (Storage = Defined width)
/// </summary>
public class SQLCharColumnAttribute : SQLColumnWithLengthAttribute
{
	protected override string SqlTypeName => "char";
}

/// <summary>
/// Variable width Unicode string. Max size = 536.870.912 characters (Storage = 2 * defined width + 2 bytes)
/// </summary>
public class SQLStringColumnAttribute : SQLColumnWithLengthAttribute
{
	protected override string SqlTypeName => "nvarchar";
}

/// <summary>
/// Allows whole numbers from 0 to 255 (Storage = 1 byte)
/// </summary>
public class SQLTinyIntColumnAttribute : SQLColumnAttribute
{
	protected override string SqlTypeName => "tinyint";
}

/// <summary>
/// Allows whole numbers between -32.768 and 32.767 (Storage = 2 byte)
/// </summary>
public class SQLSmallIntColumnAttribute : SQLColumnAttribute
{
	protected override string SqlTypeName => "smallint";
}

/// <summary>
/// Allows whole numbers between -2.147.483.648 and 2.147.483.647 (Storage = 4 byte)
/// </summary>
public class SQLSIntColumnAttribute : SQLColumnWithLengthAttribute
{
	protected override string SqlTypeName => "int";
}

/// <summary>
/// Allows whole numbers between -9.223.372.036.854.775.808 and 9.223.372.036.854.775.807 (Storage = 8 byte)
/// </summary>
public class SQLBigIntColumnAttribute : SQLColumnWithLengthAttribute
{
	protected override string SqlTypeName => "bigint";
}

/// <summary>
/// Monetary data from -214.748,3648 to 214.748,3647  (Storage = 4 byte)
/// </summary>
public class SQLSmallMoneyColumnAttribute : SQLColumnAttribute
{
	protected override string SqlTypeName => "smallmoney";
}

/// <summary>
/// Monetary data from -922.337.203.685.477,5808 to 922.337.203.685.477,5807  (Storage = 8 byte)
/// </summary>
public class SQLMoneyColumnAttribute : SQLColumnAttribute
{
	protected override string SqlTypeName => "money";
}

/// <summary>
/// A date. Format: YYYY-MM-DD. The supported range is from '1000-01-01' to '9999-12-31'
/// </summary>
public class SQLDateColumnAttribute : SQLColumnAttribute
{
	protected override string SqlTypeName => "money";
}