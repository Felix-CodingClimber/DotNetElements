namespace DotNetElements.Core.Test.TestData;

internal static class FakeEntities
{
	public static Tag TagOne => new Tag("Test Tag 1");
	public static Tag TagTwo => new Tag("Test Tag 2");
	public static Tag TagThree => new Tag("Test Tag 3");

	public static BlogPost BlogPostOne => new BlogPost("Test BlogPost 1", []);
	public static BlogPost BlogPostTwo => new BlogPost("Test BlogPost 2", []);
	public static BlogPost BlogPostThree => new BlogPost("Test BlogPost 3", []);
}
