using System.ComponentModel.DataAnnotations;

namespace Grelka.Server.Models
{
    public class StoragedFile
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public string Extension { get; set; }
    }
}
