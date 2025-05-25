using Grelka.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Grelka.Server.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public string Index()
        {
            return "index";
        }

        public string Privacy()
        {
            return "privacy";
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public string Error()
        {
            return "error";
        }
    }
}
