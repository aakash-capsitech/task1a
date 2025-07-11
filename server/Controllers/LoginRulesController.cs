using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
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
            if (dto.UserIds == null || dto.UserIds.Count == 0)
                return BadRequest("At least one user must be selected.");

            var rules = dto.UserIds.Select(userId => new LoginRule
            {
                UserIds = new List<string> { userId }, // single user per rule
                Restriction = dto.Restriction,
                FromDate = dto.FromDate,
                ToDate = dto.ToDate
            }).ToList();

            await _context.LoginRules.InsertManyAsync(rules);
            foreach (var rule in rules)
            {
                await LogAudit("Created", rule.Id, $"Created login rule for user {rule.UserIds.First()} with restriction {rule.Restriction}");
            }

            return Ok(rules); // return list of created rules
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] CreateLoginRuleDto dto)
        {
            if (dto.UserIds == null || dto.UserIds.Count != 1)
                return BadRequest("Update must target exactly one user per rule.");

            var update = Builders<LoginRule>.Update
                .Set(r => r.UserIds, dto.UserIds)
                .Set(r => r.Restriction, dto.Restriction)
                .Set(r => r.FromDate, dto.FromDate)
                .Set(r => r.ToDate, dto.ToDate);

            var result = await _context.LoginRules.UpdateOneAsync(r => r.Id == id, update);

            if (result.MatchedCount == 0)
                return NotFound();

            await LogAudit("Updated", id, $"Updated login rule for user {dto.UserIds.First()} with restriction {dto.Restriction}");


            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _context.LoginRules.DeleteOneAsync(r => r.Id == id);
            if (result.DeletedCount == 0)
                return NotFound();

            await LogAudit("Deleted", id, $"Deleted login rule with ID {id}");


            return NoContent();
        }

        [HttpGet("{id}/history")]
        public async Task<IActionResult> GetHistory(string id)
        {
            var logs = await _context.AuditLogs
                .Find(log => log.EntityId == id)
                .SortByDescending(log => log.Timestamp)
                .ToListAsync();

            return Ok(logs);
        }

        private async Task LogAudit(string action, string entityId, string description)
        {
            var log = new AuditLog
            {
                Action = action,
                EntityId = entityId,
                Description = description,
                Timestamp = DateTime.UtcNow
            };
            await _context.AuditLogs.InsertOneAsync(log);
        }

    }
}
