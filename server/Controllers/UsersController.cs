using Microsoft.AspNetCore.Mvc;
using MyMongoApp.Data;
using MyMongoApp.Dtos;
using MyMongoApp.Models;
using MongoDB.Driver;
using MyMongoApp.Enums;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using BCrypt.Net;


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


        /// <summary>
        /// for creating user
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto dto)
        {
            // Check if a user with the same email already exists
            var existingUser = await _context.Users.Find(u => u.Email == dto.Email).FirstOrDefaultAsync();
            if (existingUser != null)
            {
                return BadRequest("A user with this email already exists.");
            }

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


        /// <summary>
        /// for updating user
        /// </summary>
        /// <param name="id"></param>
        /// <param name="dto"></param>
        /// <returns></returns>
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


        /// <summary>
        /// for getting user details
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _context.Users.Find(u => u.Id == id).FirstOrDefaultAsync();

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        /// <summary>
        /// for getting profile
        /// </summary>
        /// <returns></returns>
        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _context.Users.Find(u => u.Id == userId).FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }


        /// <summary>
        /// for getting all users
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.Find(_ => true).ToListAsync();
            return Ok(users);
        }

        /// <summary>
        /// for deleting user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, id);
            var result = await _context.Users.DeleteOneAsync(filter);

            if (result.DeletedCount == 0)
            {
                return NotFound(new { message = "User not found" });
            }

            return NoContent(); // 204 No Content - success
        }


        /// <summary>
        /// for changing password
        /// </summary>
        /// <param name="id"></param>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost("{id}/change-password")]
        public async Task<IActionResult> ChangePassword(string id, [FromBody] ChangePasswordDto dto)
        {
            var user = await _context.Users.Find(u => u.Id == id).FirstOrDefaultAsync();
            if (user == null)
                return NotFound(new { message = "User not found" });

            bool isFirstTimeUser = user.Logins == 0 && user.PasswordHash == "12345";

            if (!isFirstTimeUser)
            {
                if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
                    return BadRequest(new { message = "Incorrect current password" });
            }

            var newHashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);

            var update = Builders<User>.Update
                .Set(u => u.PasswordHash, newHashedPassword)
                .Inc(u => u.Logins, 1);

            await _context.Users.UpdateOneAsync(u => u.Id == id, update);

            return Ok(new { message = "Password changed successfully." });
        }


    }
}
