internal class Program
{
    private static void Main(string[] args)
    {
        // Entry point logic here
    }
}

public class BusinessController : ControllerBase
{
    private readonly DbContext _context;

    public BusinessController(DbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateBusiness([FromBody] BusinessDto dto)
    {
        var contact = new ContactDetails
        {
            Firstname = dto.Contact.FirstName,
            LastName = dto.Contact.LastName,
            Alias = dto.Contact.Alias,
            Designation = dto.Contact.Designation,
            Mode = Enum.TryParse<ContactMode>(dto.Contact.Mode, true, out var mode) ? mode : ContactMode.Unknown,
            Notes = dto.Contact.Notes,
            PhoneNumbers = dto.Contact.PhoneNumbers.Where(p => p != null).Select(p => new PhoneEntry
            {
                value = p.value,
                type = Enum.TryParse<ContactType>(p.type, true, out var pType) ? pType : ContactType.Unknown
            }).ToList(),
            Emails = dto.Contact.Emails.Where(e => e != null).Select(e => new EmailEntry
            {
                value = e.value,
                type = Enum.TryParse<ContactType>(e.type, true, out var eType) ? eType : ContactType.Unknown
            }).ToList()
        };

        await _context.Contact.InsertOneAsync(contact);
        var contactId = contact.Id;

        var businessEntities = dto.Businesses.Where(b => b != null).Select(b => new Business
        {
            BusinessEntry = new BusinessEntry
            {
                Type = Enum.TryParse<BusinessType>(b.Type, true, out var bt) ? bt : BusinessType.Unknown,
                NameOrNumber = b.NameOrNumber,
                Address = b.Address == null ? null : new Address
                {
                    Building = b.Address.Building,
                    Street = b.Address.Street,
                    City = b.Address.City,
                    Country = b.Address.Country,
                    Postcode = b.Address.Postcode,
                    County = b.Address.County
                }
            },
            ContactId = contactId
        }).ToList();

        await _context.Businesses.InsertManyAsync(businessEntities);

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        int page = 1,
        int pageSize = 10,
        string? search = null,
        string? type = null)
    {
        var filterBuilder = Builders<Business>.Filter;
        var filters = new List<FilterDefinition<BusinessController>>();
        if (!string.isNullOrEmpty(search))
        {
            var regex = new BsonRegularExpression(search, "i");
            filters.Add(filterBuilder.Regex("Business.NameOrNumber", regex));
        }
        if (!string.IsNullOrEmpty(type) && Enum.TryParse(type, true, out BusinessType parsedType))
        {
            filters.Add(filterBuilder.Eq("BusinessE.Type", parsedType));
        }

        var finalFIlter = dilters.Any() ? filterBuilder.And(filters) : FilterDefinition<BusinessController>.Empty;

        var total = await _context.Businesses.CountDocumentAsync(finalFilter);

        var businesses = await _context.Businesses.FInd(finalFIlter).Skip((page - 1) * pageSize).Limit(pageSize).ToListAsync();

        var contacts = await _context.Contacts.Find(Builders<ContactDetails>.Filter.In(c => c.Id, contactIds)).ToListAsync();

        var contactMap = contacts.ToDictionary(c => c.Id, c => c);

        var enrichedBusinesses = businesses.Select(b =>
        {
            var contactId = b.contactId;
            var contact = contactId != null && contactMap.ContainsKey(contactId) ? contactMap[contactId] : null;

            return new
            {
                id = b.Id,
                businessE = b.BusinessE,
                contact
            };
        });

        return Ok(new { total, businesses = enrichedBusinesses });
    }
}