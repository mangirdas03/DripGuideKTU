using System.Text.Json.Serialization;

namespace DripGuide.Models
{
    public class Brand
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? EstablishmentDate { get; set; }
        public string Founder { get; set; }
        public string Headquarters { get; set; }
        public string Image { get; set; }

        [JsonIgnore]
        public virtual ICollection<Post> Posts { get; set; }
    }
}
