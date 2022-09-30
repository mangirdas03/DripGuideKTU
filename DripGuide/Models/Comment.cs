using System.Text.Json.Serialization;

namespace DripGuide.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public int User { get; set; }

        public DateTime SubmitTime { get; set; }


        public int PostId { get; set; }

        [JsonIgnore]
        public virtual Post PostNavigation { get; set; }
    }
}
