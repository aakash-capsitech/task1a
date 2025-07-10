using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
// using MyMongoApp.Models;
// using MyMongoApp.DTOs;
using MyMongoApp.Data;
using MyMongoApp.Models;
using MyMongoApp.Dtos;


namespace MyMongoApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginRulesController : ControllerBase
    {
        private readonly MongoDbContext _context;

        public LoginRulesController(MongoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var rules = await _context.LoginRules.Find(_ => true).ToListAsync();
            return Ok(rules);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateLoginRuleDto dto)
        {
            var rule = new LoginRule
            {
                UserIds = dto.UserIds,
                Restriction = dto.Restriction,
                FromDate = dto.FromDate,
                ToDate = dto.ToDate,
            };

            await _context.LoginRules.InsertOneAsync(rule);
            return Ok(rule);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] CreateLoginRuleDto dto)
        {
            var update = Builders<LoginRule>.Update
                .Set(r => r.UserIds, dto.UserIds)
                .Set(r => r.Restriction, dto.Restriction)
                .Set(r => r.FromDate, dto.FromDate)
                .Set(r => r.ToDate, dto.ToDate);

            var result = await _context.LoginRules.UpdateOneAsync(r => r.Id == id, update);

            if (result.MatchedCount == 0)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _context.LoginRules.DeleteOneAsync(r => r.Id == id);
            if (result.DeletedCount == 0)
                return NotFound();

            return NoContent();
        }
    }
}
