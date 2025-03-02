using DotNetElements.Core.EntityFramework;
using DotNetElements.Core.EntityFramework.Example;

using FakeModuleServiceFactory<LibraryDbContext> factory = new();

using(FakeModuleService<LibraryDbContext, AuthorService> authorService = factory.CreateModule<AuthorService>())
{
    CreateAuthorModel model = new()
    {
        FirstName = "John",
        LastName = "Doe"
    };

    AuthorModel author = await authorService.Service.CreateAuthorAsync(model);

    author.Dump();
}


//using (FakeModuleService<LibraryDbContext, BookService> bookService = factory.CreateModule<BookService>())
//{


//}

class BookService : ModuleService<LibraryDbContext>
{
    public BookService(LibraryDbContext dbContext) : base(dbContext)
    {
    }

    public async Task<BookModel> CreateBookAsync(CreateBookModel model)
    {
        ArgumentNullException.ThrowIfNull(model.Name);

        Book book = new Book(model.Name, model.AuthorId);

        DbContext.Books.Add(book);

        await DbContext.SaveChangesAsync();

        return book.ToModel();
    }

    public async Task<CrudResult<BookModel>> UpdateBookAsync(EditBookModel model)
    {
        Book? existingBook = await DbContext.Books
            .FindAsync(model.Id);

        if (existingBook is null)
            return Fail(CrudError.NotFound);

        existingBook.Update(model);

        await DbContext.SaveChangesAsync();

        return existingBook.ToModel();
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

        Author author = new Author(model.FirstName, model.LastName);

        DbContext.Authors.Add(author);

        await DbContext.SaveChangesAsync();

        return author.ToModel();
    }

    public async Task<CrudResult<AuthorModel>> UpdateAuthorAsync(EditAuthorModel model)
    {
        Author? existingAuthor = await DbContext.Authors
            .FindAsync(model.Id);

        if (existingAuthor is null)
            return Fail(CrudError.NotFound);

        existingAuthor.Update(model);

        await DbContext.SaveChangesAsync();

        return existingAuthor.ToModel();
    }
}

class LibraryDbContext : DbContext
{
    public DbSet<Book> Books { get; set; }
    public DbSet<Author> Authors { get; set; }
}

class Book : AuditedEntity<Guid>, IUpdateFrom<EditBookModel>, IMapToModel<BookModel>
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

    public BookModel ToModel()
    {
        return new BookModel
        {
            Id = Id,
            Name = Name,
            AuthorId = AuthorId
        };
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

class Author : AuditedEntity<Guid>, IUpdateFrom<EditAuthorModel>, IMapToModel<AuthorModel>
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

    public AuthorModel ToModel()
    {
        return new AuthorModel
        {
            Id = Id,
            FirstName = FirstName,
            LastName = LastName
        };
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