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
    public class StorageController : Controller
    {
        private readonly ILogger<StorageController> _logger;
        private readonly AppDbContext _db;
        public StorageController(ILogger<StorageController> logger, AppDbContext db)
        {
            _logger = logger;
            _db = db;
        }
        [HttpGet]
        public IActionResult GetSlides()
        {
            string filePath = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "cloud", "slide-3.webp");
            var bytes = System.IO.File.ReadAllBytes(filePath);
            return File(bytes, "image/webp");
        }

        [HttpPost]
        public async Task<IActionResult> UploadWebpFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Null file.");

            if (Path.GetExtension(file.FileName).ToLower() != ".webp")
                return BadRequest("Only .webp files.");

            var savePath = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "cloud");

            var filePath = Path.Combine(savePath, file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok();
        }

    }
}