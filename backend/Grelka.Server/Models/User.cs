namespace Grelka.Server.Models
{
    public class User
    {
        public Guid          Id { get; set; }
        public string?       Username { get; set; }
        public string?       Email { get; set; }
        public DateOnly?     Bdate { get; set; }
        public string?       Password { get; set; }
        public string?       UserType { get; set; }
        public string?       Icon { get; set; }
        public List<Order>   Orders { get; set; }
        public List<Product> LikedProducts { get; set; }
    }
}
