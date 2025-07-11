using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using MyMongoApp.Data;
using MyMongoApp.Dtos;
using MyMongoApp.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;

namespace MyMongoApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AAuthController : ControllerBase
    {
        // private readonly IMongoCollection<AUser> _users;
        private readonly IConfiguration _config;

        private readonly IMongoCollection<User> _users;
        // private readonly IMongoCollection<User> _users;
        private readonly IMongoCollection<LoginRule> _loginRules;


        public AAuthController(MongoDbContext dbContext, IConfiguration config)
        {
            _users = dbContext.Users; // <-- works now
            _loginRules = dbContext.LoginRules; // <-- Add this
            _config = config;
        }


        // [HttpPost("register")]
        // public async Task<IActionResult> Register(RegisterRequest request)
        // {
        //     var existingUser = await _users.Find(u => u.Email == request.Email).FirstOrDefaultAsync();
        //     if (existingUser != null)
        //         return BadRequest("User already exists.");

        //     var user = new AUser
        //     {
        //         Email = request.Email,
        //         PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
        //     };

        //     await _users.InsertOneAsync(user);
        //     return Ok("User registered.");
        // }


        // [HttpPost("login")]
        // public async Task<IActionResult> Login(LoginRequest request)
        // {
        //     var user = await _users.Find(u => u.Email == request.Email).FirstOrDefaultAsync();
        //     // if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        //     //     return Unauthorized("Invalid credentials.");

        //      if (user == null || request.Password!="123123")
        //         return Unauthorized("Invalid credentials.");

        //     var tokenHandler = new JwtSecurityTokenHandler();
        //     var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"] ?? "supersecretkey123");

        //     var tokenDescriptor = new SecurityTokenDescriptor
        //     {
        //         Subject = new ClaimsIdentity(new[]
        //         {
        //             new Claim(ClaimTypes.Email, user.Email),
        //             new Claim(ClaimTypes.NameIdentifier, user.Id), // <-- Add this line to include user ID
        //             new Claim(ClaimTypes.Role, user.Role),
        //         }),
        //         Expires = DateTime.UtcNow.AddHours(1),
        //         SigningCredentials = new SigningCredentials(
        //             new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        //     };

        //     var token = tokenHandler.CreateToken(tokenDescriptor);
        //     return Ok(new { token = tokenHandler.WriteToken(token) });
        // }


        /// <summary>
        /// for user login
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var user = await _users.Find(u => u.Email == request.Email).FirstOrDefaultAsync();
            if (user == null)
                return Unauthorized("Invalid credentials.");

            var now = DateTime.UtcNow;

            var isDenied = await _loginRules.Find(r =>
                r.UserIds.Contains(user.Id) &&
                r.Restriction == "deny" &&
                (
                    (r.FromDate == null || r.FromDate <= now) &&
                    (r.ToDate == null || r.ToDate >= now)
                )
            ).AnyAsync();

            if (isDenied)
            {
                return Unauthorized("Login Denied, contact Admin.");
            }

            bool isFirstTimeUser = user.Logins == 0 && user.PasswordHash == "12345";

            bool isValidPassword = isFirstTimeUser
                ? request.Password == "12345"
                : BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);

            if (!isValidPassword)
                return Unauthorized("Invalid credentials.");

            // Increment login count on successful login
            // var update = Builders<User>.Update.Inc(u => u.Logins, 1);
            // await _users.UpdateOneAsync(u => u.Id == user.Id, update);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"] ?? "supersecretkey123");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Role, user.Role),
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new { token = tokenHandler.WriteToken(token) });
        }


    }
}
