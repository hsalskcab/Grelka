using System.ComponentModel.DataAnnotations;

namespace Grelka.Server.Models
{
    public class Order
    {
        [Key]
        public Guid             Id { get; set; }
        public Guid?            CustomerId { get; set; }
        public Guid?            SellerId { get; set; }
        public DateTime         OrderDate { get; set; }
        public decimal          TotalAmount { get; set; }
        public List<Guid>? OrderedProductsId { get; set; }
    }
}

