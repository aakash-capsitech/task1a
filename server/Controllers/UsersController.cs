// using Microsoft.AspNetCore.Mvc;
// using MyMongoApp.Data;
// using MyMongoApp.Dtos;
// using MyMongoApp.Models;
// using MongoDB.Driver;
// using MyMongoApp.Enums;


// namespace MyMongoApp.Controllers
// {
//     [ApiController]
//     [Route("api/users")]
//     public class UsersController : ControllerBase
//     {
//         private readonly MongoDbContext _context;

//         public UsersController(MongoDbContext context)
//         {
//             _context = context;
//         }

        
//         [HttpPost]
//         public async Task<IActionResult> CreateUser([FromBody] CreateUserDto dto)
//         {
//             var parsedRoles = new List<UserConfigRole>();
//             foreach (var roleStr in dto.ConfigRoles)
//             {
//                 if (Enum.TryParse<UserConfigRole>(roleStr, ignoreCase: true, out var parsed))
//                 {
//                     parsedRoles.Add(parsed);
//                 }
//                 else
//                 {
//                     return BadRequest($"Invalid config role: {roleStr}");
//                 }
//             }

//             var user = new User
//             {
//                 Name = dto.Name,
//                 Email = dto.Email,
//                 Role = dto.Role,
//                 ConfigRoles = parsedRoles
//             };

//             await _context.Users.InsertOneAsync(user);
//             return Ok(user);
//         }

        
//         [HttpPut("{id}")]
//         public async Task<IActionResult> UpdateRoles(string id, [FromBody] List<string> newRoles)
//         {
//             var parsedRoles = new List<UserConfigRole>();
//             foreach (var roleStr in newRoles)
//             {
//                 if (Enum.TryParse<UserConfigRole>(roleStr, ignoreCase: true, out var parsed))
//                 {
//                     parsedRoles.Add(parsed);
//                 }
//                 else
//                 {
//                     return BadRequest($"Invalid role: {roleStr}");
//                 }
//             }

//             var update = Builders<User>.Update.Set(u => u.ConfigRoles, parsedRoles);
//             var result = await _context.Users.UpdateOneAsync(u => u.Id == id, update);

//             if (result.MatchedCount == 0)
//                 return NotFound();

//             return Ok(new { message = "Roles updated." });
//         }


//         [HttpGet("{id}")]
//         public async Task<IActionResult> GetUserById(string id)
//         {
//             var user = await _context.Users.Find(u => u.Id == id).FirstOrDefaultAsync();

//             if (user == null)
//                 return NotFound();

//             return Ok(user);
//         }


//         [HttpGet]
//         public async Task<IActionResult> GetUsers()
//         {
//             var users = await _context.Users.Find(_ => true).ToListAsync();
//             return Ok(users);
//         }
//     }
// }

















using Microsoft.AspNetCore.Mvc;
using MyMongoApp.Data;
using MyMongoApp.Dtos;
using MyMongoApp.Models;
using MongoDB.Driver;
using MyMongoApp.Enums;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;


namespace MyMongoApp.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly MongoDbContext _context;

        public UsersController(MongoDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto dto)
        {
            var parsedRoles = new List<UserConfigRole>();

            foreach (var roleStr in dto.ConfigRoles)
            {
                if (Enum.TryParse<UserConfigRole>(roleStr, ignoreCase: true, out var parsed))
                {
                    parsedRoles.Add(parsed);
                }
                else
                {
                    return BadRequest($"Invalid config role: {roleStr}");
                }
            }

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Role = dto.Role,
                Phone = dto.Phone,
                Nationality = dto.Nationality,
                Address = dto.Address,
                ConfigRoles = parsedRoles
            };

            await _context.Users.InsertOneAsync(user);
            return Ok(user);
        }

        // [HttpPut("{id}")]
        // public async Task<IActionResult> UpdateRoles(string id, [FromBody] List<string> newRoles)
        // {
        //     var parsedRoles = new List<UserConfigRole>();

        //     foreach (var roleStr in newRoles)
        //     {
        //         if (Enum.TryParse<UserConfigRole>(roleStr, ignoreCase: true, out var parsed))
        //         {
        //             parsedRoles.Add(parsed);
        //         }
        //         else
        //         {
        //             return BadRequest($"Invalid role: {roleStr}");
        //         }
        //     }

        //     var update = Builders<User>.Update.Set(u => u.ConfigRoles, parsedRoles);
        //     var result = await _context.Users.UpdateOneAsync(u => u.Id == id, update);

        //     if (result.MatchedCount == 0)
        //         return NotFound();

        //     return Ok(new { message = "Roles updated." });
        // }



        [HttpPut("{id}")]
public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserDto dto)
{
    var updates = new List<UpdateDefinition<User>>();

    if (!string.IsNullOrWhiteSpace(dto.Name))
        updates.Add(Builders<User>.Update.Set(u => u.Name, dto.Name));

    if (!string.IsNullOrWhiteSpace(dto.Email))
        updates.Add(Builders<User>.Update.Set(u => u.Email, dto.Email));

    if (!string.IsNullOrWhiteSpace(dto.Role))
        updates.Add(Builders<User>.Update.Set(u => u.Role, dto.Role));

    if (!string.IsNullOrWhiteSpace(dto.Phone))
        updates.Add(Builders<User>.Update.Set(u => u.Phone, dto.Phone));

    if (!string.IsNullOrWhiteSpace(dto.Nationality))
        updates.Add(Builders<User>.Update.Set(u => u.Nationality, dto.Nationality));

    if (!string.IsNullOrWhiteSpace(dto.Address))
        updates.Add(Builders<User>.Update.Set(u => u.Address, dto.Address));

    if (dto.ConfigRoles is not null)
    {
        var parsedRoles = new List<UserConfigRole>();
        foreach (var roleStr in dto.ConfigRoles)
        {
            if (Enum.TryParse<UserConfigRole>(roleStr, ignoreCase: true, out var parsed))
            {
                parsedRoles.Add(parsed);
            }
            else
            {
                return BadRequest($"Invalid config role: {roleStr}");
            }
        }
        updates.Add(Builders<User>.Update.Set(u => u.ConfigRoles, parsedRoles));
    }

    if (!updates.Any())
        return BadRequest("No valid fields provided for update.");

    var updateDef = Builders<User>.Update.Combine(updates);
    var result = await _context.Users.UpdateOneAsync(u => u.Id == id, updateDef);

    if (result.MatchedCount == 0)
        return NotFound();

    return Ok(new { message = "User updated successfully." });
}


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _context.Users.Find(u => u.Id == id).FirstOrDefaultAsync();

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            Console.WriteLine($"🔍 Extracted userId from token: {userId}");

            if (userId == null)
            {
                Console.WriteLine("❌ No userId in token. Returning Unauthorized.");
                return Unauthorized();
            }

            var user = await _context.Users.Find(u => u.Id == userId).FirstOrDefaultAsync();

            if (user == null)
            {
                Console.WriteLine($"❌ No user found in DB with id: {userId}");
                return NotFound();
            }

            Console.WriteLine($"✅ Found user: {user.Name} ({user.Email})");

            return Ok(user);
        }


        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.Find(_ => true).ToListAsync();
            return Ok(users);
        }
    }
}
