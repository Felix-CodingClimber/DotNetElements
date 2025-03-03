using DotNetElements.Core.EntityFramework;
using DotNetElements.Core.EntityFramework.Example;
using Microsoft.Extensions.Logging;

using FakeModuleServiceFactory<LibraryDbContext> factory = new();

// Create author
using (FakeModuleService<LibraryDbContext, AuthorService> authorService = factory.CreateModule<AuthorService>("Create author"))
{
	CreateAuthorModel model = new()
	{
		FirstName = "Author 1",
		LastName = "Not Updated"
	};

	AuthorModel author = await authorService.Service.CreateAuthorAsync(model);

	author.Dump("Create");

	// Get author audit details
	CrudResult<DeletionAuditedModelDetails> auditDetails = await authorService.Service.GetAuthorAuditDetailsById(author.Id);
	auditDetails.Dump("Author Details");
}

// Get all authors
IReadOnlyList<AuthorModel> authors = [];
using (FakeModuleService<LibraryDbContext, AuthorService> authorService = factory.CreateModule<AuthorService>("Get all authors"))
{
	authors = await authorService.Service.GetAllAuthorsAsync();

	authors.Dump("GetAll");
}

// Update author
using (FakeModuleService<LibraryDbContext, AuthorService> authorService = factory.CreateModule<AuthorService>("Update author"))
{
	EditAuthorModel model = EditAuthorModel.MapFromModel(authors[0]);
	model.LastName = "Update 1";

	CrudResult<AuthorModel> updateResult = await authorService.Service.UpdateAuthorAsync(model);

	updateResult.Dump("Update");

	// Get author audit details
	CrudResult<DeletionAuditedModelDetails> auditDetails = await authorService.Service.GetAuthorAuditDetailsById(model.Id);
	auditDetails.Dump("Author Details");
}

// Create Book
using (FakeModuleService<LibraryDbContext, BookService> bookService = factory.CreateModule<BookService>("Create book"))
{
	CreateBookModel model = new()
	{
		Name = "Book 1",
		AuthorId = authors[0].Id
	};

	BookModel book = await bookService.Service.CreateBookAsync(model);

	book.Dump("Create");

	// Get book audit details
	CrudResult<DeletionAuditedModelDetails> auditDetails = await bookService.Service.GetBookAuditDetailsById(book.Id);
	auditDetails.Dump("Book Details");
}

// Get all books
IReadOnlyList<BookModel> books = [];
using (FakeModuleService<LibraryDbContext, BookService> bookService = factory.CreateModule<BookService>("Get all books"))
{
	books = await bookService.Service.GetAllBooksAsync();

	books.Dump("GetAll");
}

// Delete book
using (FakeModuleService<LibraryDbContext, BookService> bookService = factory.CreateModule<BookService>("Delete book"))
{
	CrudResult deleteResult = await bookService.Service.DeleteBookByIdAsync(books[0].Id);

	deleteResult.Dump("Delete");
}

// Get all books
books = [];
using (FakeModuleService<LibraryDbContext, BookService> bookService = factory.CreateModule<BookService>("Get all books"))
{
	books = await bookService.Service.GetAllBooksAsync();

	books.Dump("GetAll");

	// Get author audit details
	CrudResult<DeletionAuditedModelDetails> auditDetails = await bookService.Service.GetBookAuditDetailsById(books[0].Id);
	auditDetails.Dump("Book Details");
}

// Update book
using (FakeModuleService<LibraryDbContext, BookService> bookService = factory.CreateModule<BookService>("Update book"))
{
	EditBookModel model = EditBookModel.MapFromModel(books[0]);
	model.Name = "Update 1";

	CrudResult<BookModel> updateResult = await bookService.Service.UpdateBookAsync(model);

	updateResult.Dump("Update");

	// Get book audit details
	CrudResult<DeletionAuditedModelDetails> auditDetails = await bookService.Service.GetBookAuditDetailsById(model.Id);
	auditDetails.Dump("Book Details");
}

class BookService : ModuleService<LibraryDbContext>
{
	public BookService(LibraryDbContext dbContext) : base(dbContext)
	{
	}

	public async Task<BookModel> CreateBookAsync(CreateBookModel model)
	{
		ArgumentNullException.ThrowIfNull(model.Name);

		Book book = new(model.Name, model.AuthorId);

		DbContext.Books.Add(book);

		await DbContext.SaveChangesAsync();

		return book.MapToModel();
	}

	public async Task<CrudResult<BookModel>> UpdateBookAsync(EditBookModel model)
	{
		Book? existingBook = await DbContext.Books
			.EnsureNotDeleted()
			.FindAsync(model.Id);

		if (existingBook is null)
			return Fail(CrudError.NotFound);

		existingBook.Update(model);

		await DbContext.SaveChangesAsync();

		return existingBook.MapToModel();
	}

	public async Task<CrudResult> DeleteBookByIdAsync(Guid Id)
	{
		Book? existingBook = await DbContext.Books
			.FindAsync(Id);

		if (existingBook is null)
			return Fail(CrudError.NotFound);

		DbContext.Books.Remove(existingBook);
		await DbContext.SaveChangesAsync();

		return CrudResult.Ok();
	}

	public async Task<IReadOnlyList<BookModel>> GetAllBooksAsync()
	{
		return await DbContext.Books
			.MapToModel()
			.ToListAsync();
	}

	public Task<CrudResult<DeletionAuditedModelDetails>> GetBookAuditDetailsById(Guid id)
	{
		return GetDeletionAuditedDetailsByEntityId<Book, Guid>(id);
	}
}

class AuthorService : ModuleService<LibraryDbContext>
{
	public AuthorService(LibraryDbContext dbContext) : base(dbContext)
	{
	}

	public async Task<AuthorModel> CreateAuthorAsync(CreateAuthorModel model)
	{
		ArgumentNullException.ThrowIfNull(model.FirstName);
		ArgumentNullException.ThrowIfNull(model.LastName);

		Author author = new(model.FirstName, model.LastName);

		DbContext.Authors.Add(author);

		await DbContext.SaveChangesAsync();

		return author.MapToModel();
	}

	public async Task<CrudResult<AuthorModel>> UpdateAuthorAsync(EditAuthorModel model)
	{
		Author? existingAuthor = await DbContext.Authors
			.FindAsync(model.Id);

		if (existingAuthor is null)
			return Fail(CrudError.NotFound);

		existingAuthor.Update(model);

		await DbContext.SaveChangesAsync();

		return existingAuthor.MapToModel();
	}

	public async Task<CrudResult> DeleteAuthorByIdAsync(Guid Id)
	{
		Author? existingAuthor = await DbContext.Authors
			.EnsureNotDeleted()
			.FindAsync(Id);

		if (existingAuthor is null)
			return Fail(CrudError.NotFound);

		DbContext.Authors.Remove(existingAuthor);
		await DbContext.SaveChangesAsync();

		return CrudResult.Ok();
	}

	public async Task<IReadOnlyList<AuthorModel>> GetAllAuthorsAsync()
	{
		return await DbContext.Authors
			.EnsureNotDeleted()
			.MapToModel()
			.ToListAsync();
	}

	public Task<CrudResult<DeletionAuditedModelDetails>> GetAuthorAuditDetailsById(Guid id)
	{
		return GetDeletionAuditedDetailsByEntityId<Author, Guid>(id);
	}
}

class LibraryDbContext : DbContext, IFakeDbContext
{
	public DbSet<Book> Books { get; set; } = default!;
	public DbSet<Author> Authors { get; set; } = default!;

	public Action<string> LogAction { set => logAction = value; }

	private Action<string>? logAction;

	public LibraryDbContext(DbContextOptions options) : base(options)
	{

	}

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		=> optionsBuilder
		.LogTo(
			logAction ?? Console.WriteLine,
			LogLevel.Information,
			Microsoft.EntityFrameworkCore.Diagnostics.DbContextLoggerOptions.None)
		.EnableSensitiveDataLogging();
}

class Book : DeletionAuditedEntity<Guid>, IUpdateFrom<EditBookModel>
{
	public string Name { get; private set; }
	public Guid AuthorId { get; private set; }

	[ForeignKey(nameof(AuthorId))]
	public Author Author { get; private set; } = null!;

	public Book(string name, Guid authorId, Guid id = default)
	{
		Id = id;
		Name = name;
		AuthorId = authorId;
	}

	public void Update(EditBookModel from)
	{
		ArgumentNullException.ThrowIfNull(from.Name);

		Name = from.Name;
		AuthorId = from.AuthorId;
	}
}

static class BookMapper
{
	public static BookModel MapToModel(this Book entity)
	{
		return new BookModel
		{
			Id = entity.Id,
			Name = entity.Name,
			AuthorId = entity.AuthorId
		};
	}

	public static IQueryable<BookModel> MapToModel(this IQueryable<Book> query)
	{
		return Queryable.Select(query, entity => new BookModel()
		{
			Id = entity.Id,
			Name = entity.Name,
			AuthorId = entity.AuthorId
		});
	}
}

class BookModel : Model<Guid>
{
	public required string Name { get; init; }
	public required Guid AuthorId { get; init; }
}

class CreateBookModel : CreateModel<BookModel, Guid>
{
	[Required]
	public string? Name { get; set; }

	[Required]
	public Guid AuthorId { get; set; }
}

class EditBookModel : EditModel<BookModel, Guid>, IMapFromModel<EditBookModel, BookModel>
{
	public string? Name { get; set; }
	public Guid AuthorId { get; set; }

	public static EditBookModel MapFromModel(BookModel model)
	{
		return new EditBookModel
		{
			Id = model.Id,
			Name = model.Name,
			AuthorId = model.AuthorId
		};
	}
}

class Author : DeletionAuditedEntity<Guid>, IUpdateFrom<EditAuthorModel>
{
	public string FirstName { get; private set; }
	public string LastName { get; private set; }

	private readonly List<Book> books = default!;

	[BackingField(nameof(books))]
	public IReadOnlyList<Book> Books => books;

	public Author(string firstName, string lastName)
	{
		FirstName = firstName;
		LastName = lastName;
	}

	public void Update(EditAuthorModel from)
	{
		ArgumentNullException.ThrowIfNull(from.FirstName);
		ArgumentNullException.ThrowIfNull(from.LastName);

		FirstName = from.FirstName;
		LastName = from.LastName;
	}
}

static class AuthorMapper
{
	public static AuthorModel MapToModel(this Author entity)
	{
		return new AuthorModel
		{
			Id = entity.Id,
			FirstName = entity.FirstName,
			LastName = entity.LastName
		};
	}

	public static IQueryable<AuthorModel> MapToModel(this IQueryable<Author> query)
	{
		return Queryable.Select(query, entity => new AuthorModel()
		{
			Id = entity.Id,
			FirstName = entity.FirstName,
			LastName = entity.LastName
		});
	}
}

class AuthorModel : Model<Guid>
{
	public required string FirstName { get; init; }
	public required string LastName { get; init; }
}

class CreateAuthorModel : CreateModel<AuthorModel, Guid>
{
	[Required]
	public string? FirstName { get; set; }

	[Required]
	public string? LastName { get; set; }
}

class EditAuthorModel : EditModel<AuthorModel, Guid>, IMapFromModel<EditAuthorModel, AuthorModel>
{
	public string? FirstName { get; set; }
	public string? LastName { get; set; }

	public static EditAuthorModel MapFromModel(AuthorModel model)
	{
		return new EditAuthorModel
		{
			Id = model.Id,
			FirstName = model.FirstName,
			LastName = model.LastName
		};
	}
}