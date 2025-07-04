using Microsoft.AspNetCore.Mvc;
using MyMongoApp.Data;
using MyMongoApp.Dtos;
using MyMongoApp.Models;
using MongoDB.Driver;

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
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Role = dto.Role,
                ConfigRoles = dto.ConfigRoles
            };

            await _context.Users.InsertOneAsync(user);
            return Ok(user);
        }

/// <summary>
/// 
/// </summary>
/// <param name="id"></param>
/// <param name="newRoles"></param>
/// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoles(string id, [FromBody] List<string> newRoles)
        {
            var update = Builders<User>.Update.Set(u => u.ConfigRoles, newRoles);
            var result = await _context.Users.UpdateOneAsync(
                u => u.Id == id,
                update
            );

            if (result.MatchedCount == 0)
                return NotFound();

            return Ok(new { message = "Roles updated." });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _context.Users.Find(u => u.Id == id).FirstOrDefaultAsync();

            if (user == null)
                return NotFound();

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
