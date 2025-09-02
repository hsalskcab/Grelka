using System.ComponentModel.DataAnnotations;

namespace Grelka.Server.Models
{
    public struct CountSizes
    {
        public int Count;
        public string? Size;
        public CountSizes() { this.Count = 0; this.Size = ""; }
    }
    public class Product
    {
        [Key]
        public Guid           Id { get; set; }
        public string?        Name { get; set; }
        public string?        Brand { get; set; }
        public string?        Description { get; set; }
        public CountSizes?    Presence { get; set; }
        public decimal        Price { get; set; }
        public List<string>   Images { get; set; }
        public string?        Category { get; set; }
        public string?        Condition { get; set; }
        public string?        Sex { get; set; }
        public Guid?          SellerId { get; set; }
    }
}
