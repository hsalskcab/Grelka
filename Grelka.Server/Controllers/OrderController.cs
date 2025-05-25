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
    public class OrderController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly AppDbContext _db;
        public OrderController(ILogger<HomeController> logger, AppDbContext db)
        {
            _logger = logger;
            _db = db;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _db.Orders.ToListAsync<Order>();
            if (list.IsNullOrEmpty())
            {
                return NotFound("No Orders found.");
            }
            return Ok(list);
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Guid id)
        {
            var result = await _db.Orders.FindAsync(id);
            if(result == null)
            {
                return NotFound($"Order with id {id} not found");
            }
            return Ok(result);
        }
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Order Order)
        {
            if (Order == null)
            {
                return BadRequest("Order is null");
            }
            try
            {
                _db.Orders.Update(Order);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Order Order)
        {
            if (Order == null)
            {
                return BadRequest("Null Order");
            }
            try
            {
                await _db.Orders.AddAsync(Order);
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
            var item = await _db.FindAsync<Order>(id);
            if (item == null)
            {
                return BadRequest("Null id");
            }
            try
            {
                _db.Orders.Remove(item);
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
