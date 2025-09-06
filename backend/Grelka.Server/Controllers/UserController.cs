using Grelka.Server.DbContexts;
using Grelka.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;

namespace Grelka.Server.Controllers
{
    public class UserController : Controller    //TODO: login, register
    {
        private readonly ILogger<UserController> _logger;
        private readonly AppDbContext _db;
        public UserController(ILogger<UserController> logger, AppDbContext db)
        {
            _logger = logger;
            _db = db;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _db.Users.ToListAsync<User>();
            if (list.IsNullOrEmpty())
            {
                return NotFound("No Users found.");
            }
            return Ok(list);
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Guid id)
        {
            var result = await _db.Users.FindAsync(id);
            if (result == null)
            {
                return NotFound($"User with id {id} not found");
            }
            return Ok(result);
        }
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] User User)
        {
            if (User == null)
            {
                return BadRequest("User is null");
            }
            try
            {
                _db.Users.Update(User);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] User User)
        {
            if (User == null)
            {
                return BadRequest("Null User");
            }
            try
            {
                await _db.Users.AddAsync(User);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] Guid id)
        {
            var item = await _db.FindAsync<User>(id);
            if (item == null)
            {
                return BadRequest("Null id");
            }
            try
            {
                _db.Users.Remove(item);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
