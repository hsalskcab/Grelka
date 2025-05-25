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
    public class ProductController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly AppDbContext _db;
        public ProductController(ILogger<HomeController> logger, AppDbContext db)
        {
            _logger = logger;
            _db = db;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _db.Products.ToListAsync<Product>();
            if (list.IsNullOrEmpty())
            {
                return NotFound("No products found.");
            }
            return Ok(list);
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Guid id)
        {
            var result = await _db.Products.FindAsync(id);
            if(result == null)
            {
                return NotFound($"Product with id {id} not found");
            }
            return Ok(result);
        }
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest("Product is null");
            }
            try
            {
                _db.Products.Update(product);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest("Null product");
            }
            try
            {
                await _db.Products.AddAsync(product);
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
            var item = await _db.FindAsync<Product>(id);
            if (item == null)
            {
                return BadRequest("Null id");
            }
            try
            {
                _db.Products.Remove(item);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet]
        public async Task<IActionResult> Sort([FromQuery] string category, [FromQuery] string size, [FromQuery] string sex, [FromQuery] string upperPriceLimit, [FromQuery] string lowerPriceLimit)
        {
            var products = await _db.Products.ToListAsync();
            if (!string.IsNullOrWhiteSpace(category))
            {
                products = products.Where(p =>
                category.Contains(p.Category!)).ToList();
            }
            if (!string.IsNullOrWhiteSpace(size))
            {
                products = products.Where(p =>
                size.Contains(p.Presence!)).ToList();
            }
            if (!string.IsNullOrWhiteSpace(sex))
            {
                products = products.Where(p =>
                sex.Contains(p.Sex!)).ToList();
            }
            if (!string.IsNullOrWhiteSpace(upperPriceLimit))
            {
                decimal price = decimal.Parse(upperPriceLimit);
                products = products.Where(p =>
                p.Price <= price).ToList();
            }
            if (!string.IsNullOrWhiteSpace(lowerPriceLimit))
            {
                decimal price = decimal.Parse(lowerPriceLimit);
                products = products.Where(p =>
                p.Price <= price).ToList();
            }
            if (products.IsNullOrEmpty())
            {
                return NotFound("No products found");
            }
            return Ok(products);
        }
    }
}
