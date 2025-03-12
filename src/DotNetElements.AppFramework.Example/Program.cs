using DotNetElements.AppFramework;
using DotNetElements.AppFramework.Abstractions.Auth;
using DotNetElements.AppFramework.Abstractions.Model;
using DotNetElements.AppFramework.DebugEfCore;
using Microsoft.Extensions.Logging;

using FakeModuleServiceFactory<LibraryDbContext> factory = new();

// Create author 1
using (FakeModuleService<LibraryDbContext, AuthorService> authorService = factory.CreateModule<AuthorService>("Create author 1"))
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
    auditDetails.Dump("Author 1 Details");
}

// Create author 2
using (FakeModuleService<LibraryDbContext, AuthorService> authorService = factory.CreateModule<AuthorService>("Create author 2"))
{
    CreateAuthorModel model = new()
    {
        FirstName = "Author 2",
        LastName = "Not Updated"
    };

    AuthorModel author = await authorService.Service.CreateAuthorAsync(model);

    author.Dump("Create");

    // Get author audit details
    CrudResult<DeletionAuditedModelDetails> auditDetails = await authorService.Service.GetAuthorAuditDetailsById(author.Id);
    auditDetails.Dump("Author 2 Details");
} 

// Get all authors
IReadOnlyList<AuthorModel> authors = [];
using (FakeModuleService<LibraryDbContext, AuthorService> authorService = factory.CreateModule<AuthorService>("Get all authors (1)"))
{
    authors = await authorService.Service.GetAllAuthorsAsync();

    authors.Dump("GetAll");
}

// Update author
//using (FakeModuleService<LibraryDbContext, AuthorService> authorService = factory.CreateModule<AuthorService>("Update author 1 (Update 1)"))
//{
//    EditAuthorModel model = EditAuthorModel.MapFromModel(authors[0]);
//    model.LastName = "Update 1";

//    CrudResult<AuthorModel> updateResult = await authorService.Service.UpdateAuthorAsync(model);

//    updateResult.Dump("Update");

//    // Get author audit details
//    CrudResult<DeletionAuditedModelDetails> auditDetails = await authorService.Service.GetAuthorAuditDetailsById(model.Id);
//    auditDetails.Dump("Author 1 Details");
//}

// Get all authors again (To resolve concurrency conflict)
//using (FakeModuleService<LibraryDbContext, AuthorService> authorService = factory.CreateModule<AuthorService>("Get all authors 2"))
//{
//    authors = await authorService.Service.GetAllAuthorsAsync();

//    authors.Dump("GetAll 2");
//}

// Update author again
//using (FakeModuleService<LibraryDbContext, AuthorService> authorService = factory.CreateModule<AuthorService>("Update author 1 (Update 2)"))
//{
//    EditAuthorModel model = EditAuthorModel.MapFromModel(authors[0]);
//    model.LastName = "Update 2";

//    CrudResult<AuthorModel> updateResult = await authorService.Service.UpdateAuthorAsync(model);

//    updateResult.Dump("Update");

//    // Get author audit details
//    CrudResult<DeletionAuditedModelDetails> auditDetails = await authorService.Service.GetAuthorAuditDetailsById(model.Id);
//    auditDetails.Dump("Author 1 Details");
//}

// Create Book
using (FakeModuleService<LibraryDbContext, BookService> bookService = factory.CreateModule<BookService>("Create book 1"))
{
    CreateBookModel model = new()
    {
        Name = "Book 1",
        AuthorIds = [authors[0].Id]
    };

    BookModel book = await bookService.Service.CreateBookAsync(model);

    book.Dump("Create");

    // Get book audit details
    CrudResult<DeletionAuditedModelDetails> auditDetails = await bookService.Service.GetBookAuditDetailsById(book.Id);
    auditDetails.Dump("Book 1 Details");
}

// Get all books
IReadOnlyList<BookModel> books = [];
using (FakeModuleService<LibraryDbContext, BookService> bookService = factory.CreateModule<BookService>("Get all books"))
{
    books = await bookService.Service.GetAllBooksAsync();

    books.Dump("GetAll");
}

// Delete book
//using (FakeModuleService<LibraryDbContext, BookService> bookService = factory.CreateModule<BookService>("Delete book 1"))
//{
//    CrudResult deleteResult = await bookService.Service.DeleteBookByIdAsync(books[0].Id);

//    deleteResult.Dump("Delete");
//}

//// Get all books
//books = [];
//using (FakeModuleService<LibraryDbContext, BookService> bookService = factory.CreateModule<BookService>("Get all books"))
//{
//    books = await bookService.Service.GetAllBooksAsync();

//    books.Dump("GetAll");

//    // Get author audit details
//    CrudResult<DeletionAuditedModelDetails> auditDetails = await bookService.Service.GetBookAuditDetailsById(books[0].Id);
//    auditDetails.Dump("Book Details");
//}

// Update book 1 change name
//using (FakeModuleService<LibraryDbContext, BookService> bookService = factory.CreateModule<BookService>("Update book 1 (Change name)"))
//{
//    EditBookModel model = EditBookModel.MapFromModel(books[0]);
//    model.Name = "Update 1";

//    CrudResult<BookModel> updateResult = await bookService.Service.UpdateBookAsync(model);

//    updateResult.Dump("Update");

//    // Get book audit details
//    CrudResult<DeletionAuditedModelDetails> auditDetails = await bookService.Service.GetBookAuditDetailsById(model.Id);
//    auditDetails.Dump("Book 1 Details");
//}

// Update book 1 add author
using (FakeModuleService<LibraryDbContext, BookService> bookService = factory.CreateModule<BookService>("Update book 1 (Add author)"))
{
    EditBookModel model = EditBookModel.MapFromModel(books[0]);
    model.AuthorIds.Add(authors[1].Id);

    CrudResult<BookModel> updateResult = await bookService.Service.UpdateBookAsync(model);

    updateResult.Dump("Update");

    // Get book audit details
    CrudResult<DeletionAuditedModelDetails> auditDetails = await bookService.Service.GetBookAuditDetailsById(model.Id);
    auditDetails.Dump("Book 1 Details");
}

Console.WriteLine("Press any key to exit...");
Console.ReadKey();

class BookService : ModuleService<LibraryDbContext>
{
    public BookService(LibraryDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider)
        : base(dbContext, currentUserProvider, timeProvider)
    {
    }

    public async Task<BookModel> CreateBookAsync(CreateBookModel model)
    {
        ArgumentNullException.ThrowIfNull(model.Name);

        Book newEntity = new(model.Name, model.AuthorIds);

        await AttachAndSaveChangesAsync(newEntity);

        return newEntity.MapToModel();
    }

    public async Task<CrudResult<BookModel>> UpdateBookAsync(EditBookModel model)
    {
        Book? existingEntity = await DbContext.Books
            .Include(book => book.Authors)
            .FindAsync(model.Id);

        CrudResult<Book> updateResult = await UpdateAndSaveChangesAsync(existingEntity, model);

        if (updateResult.TryGetValue(out Book? updatedEntity, out CrudError? error))
            return updatedEntity.MapToModel();
        else
            return Fail(error.Value);
    }

    public Task<CrudResult> DeleteBookByIdAsync(Guid Id)
    {
        return RemoveByIdAndSaveChangesAsync<Book, Guid>(Id);
    }

    public async Task<IReadOnlyList<BookModel>> GetAllBooksAsync()
    {
        return await DbContext.Books
            .ExcludeDeleted()
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
    public AuthorService(LibraryDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider)
        : base(dbContext, currentUserProvider, timeProvider)
    {
    }

    public async Task<AuthorModel> CreateAuthorAsync(CreateAuthorModel model)
    {
        ArgumentNullException.ThrowIfNull(model.FirstName);
        ArgumentNullException.ThrowIfNull(model.LastName);

        Author newEntity = new(model.FirstName, model.LastName);

        await AttachAndSaveChangesAsync(newEntity);

        return newEntity.MapToModel();
    }

    public async Task<CrudResult<AuthorModel>> UpdateAuthorAsync(EditAuthorModel model)
    {
        Author? existingEntity = await DbContext.Authors
            .FindAsync(model.Id);

        CrudResult<Author> updateResult = await UpdateAndSaveChangesAsync(existingEntity, model);

        if (updateResult.TryGetValue(out Author? updatedEntity, out CrudError? error))
            return updatedEntity.MapToModel();
        else
            return Fail(error.Value);
    }

    public Task<CrudResult> DeleteAuthorByIdAsync(Guid Id)
    {
        return RemoveByIdAndSaveChangesAsync<Author>(Id);
    }

    public async Task<IReadOnlyList<AuthorModel>> GetAllAuthorsAsync()
    {
        return await DbContext.Authors
            .ExcludeDeleted()
            .MapToModel()
            .ToListAsync();
    }

    public Task<CrudResult<DeletionAuditedModelDetails>> GetAuthorAuditDetailsById(Guid id)
    {
        return GetDeletionAuditedDetailsByEntityId<Author>(id);
    }
}

class AddressService : ModuleService<LibraryDbContext>
{
    public AddressService(LibraryDbContext dbContext, ICurrentUserProvider currentUserProvider, TimeProvider timeProvider)
        : base(dbContext, currentUserProvider, timeProvider)
    {
    }

    public async Task<AddressModel> CreateAddressAsync(CreateAddressModel model)
    {
        ArgumentNullException.ThrowIfNull(model.Street);
        ArgumentNullException.ThrowIfNull(model.City);
        ArgumentNullException.ThrowIfNull(model.State);
        ArgumentNullException.ThrowIfNull(model.Zip);

        Address newEntity = new(model.Street, model.City, model.State, model.Zip, model.AuthorId);

        await AttachAndSaveChangesAsync(newEntity);

        return newEntity.MapToModel();
    }

    public async Task<CrudResult<AddressModel>> UpdateAddressAsync(EditAddressModel model)
    {
        Address? existingEntity = await DbContext.Addresses
            .FindAsync(model.Id);

        CrudResult<Address> updateResult = await UpdateAndSaveChangesAsync(existingEntity, model);

        if (updateResult.TryGetValue(out Address? updatedEntity, out CrudError? error))
            return updatedEntity.MapToModel();
        else
            return Fail(error.Value);
    }

    public Task<CrudResult> DeleteAddressByIdAsync(Guid Id)
    {
        return RemoveByIdAndSaveChangesAsync<Address>(Id);
    }

    public async Task<IReadOnlyList<AddressModel>> GetAllAddressesAsync()
    {
        return await DbContext.Addresses
            .MapToModel()
            .ToListAsync();
    }

    public Task<CrudResult<AuditedModelDetails>> GetAddressAuditDetailsById(Guid id)
    {
        return GetAuditedDetailsByEntityId<Address>(id);
    }
}

class LibraryDbContext : DbContext, IFakeDbContext
{
    public DbSet<Book> Books { get; set; } = default!;
    public DbSet<Author> Authors { get; set; } = default!;
    public DbSet<Address> Addresses { get; set; } = default!;

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

class Book : DeletionAuditedEntity<Guid>, IUpdateFromEx<EditBookModel>
{
    public string Name { get; private set; }

    private readonly List<Author> authors = [];

    [BackingField(nameof(authors))]
    public IReadOnlyList<Author> Authors => authors;

    public Book(string name, List<Guid> authorIds, Guid id = default)
    {
        Id = id;
        Name = name;
        authors = EntityHelper.CreateRefsById<Author>(authorIds);
    }

#nullable disable
    private Book() { }
#nullable enable

    public void Update(EditBookModel from, IEntityUpdateHelper entityUpdateHelper)
    {
        ArgumentNullException.ThrowIfNull(from.Name);

        Name = from.Name;

        entityUpdateHelper.UpdateRelatedEntities(authors, from.AuthorIds);
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
            Authors = entity.Authors.Select(a => a.MapToModel()).ToList()
        };
    }

    public static IQueryable<BookModel> MapToModel(this IQueryable<Book> query)
    {
        return Queryable.Select(query, entity => new BookModel()
        {
            Id = entity.Id,
            Name = entity.Name,
            Authors = Enumerable.ToList(Enumerable.Select(entity.Authors, author => new AuthorModel()
            {
                Id = author.Id,
                FirstName = author.FirstName,
                LastName = author.LastName,
                Version = author.Version
            }))
        });
    }
}

class BookModel : Model<Guid>
{
    public required string Name { get; init; }
    public required List<AuthorModel> Authors { get; init; }
}

class CreateBookModel : CreateModel<BookModel, Guid>
{
    [Required]
    public string? Name { get; set; }

    [Required]
    public List<Guid> AuthorIds { get; set; } = [];
}

class EditBookModel : EditModel<BookModel, Guid>, IMapFromModel<EditBookModel, BookModel>
{
    public string? Name { get; set; }
    public List<Guid> AuthorIds { get; set; } = [];

    public static EditBookModel MapFromModel(BookModel model)
    {
        return new EditBookModel
        {
            Id = model.Id,
            Name = model.Name,
            AuthorIds = model.Authors.Select(a => a.Id).ToList()
        };
    }
}

class Author : DeletionAuditedEntity<Guid>, IUpdateFrom<EditAuthorModel>, IEntityHasVersion
{
    public string FirstName { get; private set; }
    public string LastName { get; private set; }

    private readonly List<Book> books = [];

    [BackingField(nameof(books))]
    public IReadOnlyList<Book> Books => books;

    [ConcurrencyCheck]
    public Guid Version { get; private set; }

    public Author(string firstName, string lastName, Guid id = default)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
    }

#nullable disable
    private Author() { }
#nullable enable

    public void Update(EditAuthorModel from)
    {
        ArgumentNullException.ThrowIfNull(from.FirstName);
        ArgumentNullException.ThrowIfNull(from.LastName);

        FirstName = from.FirstName;
        LastName = from.LastName;
    }

    public void UpdateVersion()
    {
        Version = IEntityHasVersion.GetUpdatedVersion();
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
            LastName = entity.LastName,
            Version = entity.Version
        };
    }

    public static IQueryable<AuthorModel> MapToModel(this IQueryable<Author> query)
    {
        return Queryable.Select(query, entity => new AuthorModel()
        {
            Id = entity.Id,
            FirstName = entity.FirstName,
            LastName = entity.LastName,
            Version = entity.Version
        });
    }
}

class AuthorModel : VersionedModel<Guid>
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

class EditAuthorModel : VersionedEditModel<AuthorModel, Guid>, IMapFromModel<EditAuthorModel, AuthorModel>
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    public static EditAuthorModel MapFromModel(AuthorModel model)
    {
        return new EditAuthorModel
        {
            Id = model.Id,
            FirstName = model.FirstName,
            LastName = model.LastName,
            Version = model.Version
        };
    }
}

class Address : AuditedEntity<Guid>, IUpdateFrom<EditAddressModel>
{
    public string Street { get; private set; }
    public string City { get; private set; }
    public string State { get; private set; }
    public string Zip { get; private set; }

    public Guid AuthorId { get; private set; }

    [BackingField(nameof(AuthorId))]
    public Author Author { get; private set; } = null!;

    public Address(string street, string city, string state, string zip, Guid authorId)
    {
        Street = street;
        City = city;
        State = state;
        Zip = zip;
        AuthorId = authorId;
    }

#nullable disable
    private Address() { }
#nullable enable

    public void Update(EditAddressModel from)
    {
        ArgumentNullException.ThrowIfNull(from.Street);
        ArgumentNullException.ThrowIfNull(from.City);
        ArgumentNullException.ThrowIfNull(from.State);
        ArgumentNullException.ThrowIfNull(from.Zip);

        Street = from.Street;
        City = from.City;
        State = from.State;
        Zip = from.Zip;
        AuthorId = from.AuthorId;
    }
}

static class AddressMapper
{
    public static AddressModel MapToModel(this Address entity)
    {
        return new AddressModel
        {
            Id = entity.Id,
            Street = entity.Street,
            City = entity.City,
            State = entity.State,
            Zip = entity.Zip,
            AuthorId = entity.AuthorId
        };
    }
    public static IQueryable<AddressModel> MapToModel(this IQueryable<Address> query)
    {
        return Queryable.Select(query, entity => new AddressModel()
        {
            Id = entity.Id,
            Street = entity.Street,
            City = entity.City,
            State = entity.State,
            Zip = entity.Zip,
            AuthorId = entity.AuthorId
        });
    }
}

class AddressModel : Model<Guid>
{
    public required string Street { get; init; }
    public required string City { get; init; }
    public required string State { get; init; }
    public required string Zip { get; init; }
    public required Guid AuthorId { get; init; }
}

class CreateAddressModel : CreateModel<AddressModel, Guid>
{
    [Required]
    public string? Street { get; set; }

    [Required]
    public string? City { get; set; }

    [Required]
    public string? State { get; set; }

    [Required]
    public string? Zip { get; set; }

    [Required]
    public Guid AuthorId { get; set; }
}

class EditAddressModel : EditModel<AddressModel, Guid>, IMapFromModel<EditAddressModel, AddressModel>
{
    [Required]
    public string? Street { get; set; }

    [Required]
    public string? City { get; set; }

    [Required]
    public string? State { get; set; }

    [Required]
    public string? Zip { get; set; }

    [Required]
    public Guid AuthorId { get; set; }

    public static EditAddressModel MapFromModel(AddressModel model)
    {
        return new EditAddressModel
        {
            Id = model.Id,
            Street = model.Street,
            City = model.City,
            State = model.State,
            Zip = model.Zip,
            AuthorId = model.AuthorId
        };
    }
}