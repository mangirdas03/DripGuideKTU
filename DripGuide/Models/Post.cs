
namespace DripGuide.Models
{
    public class Post
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Description2 { get; set; }

        public string Material { get; set; }

        public string Price { get; set; }

        public DateTime? ReleaseDate { get; set; }

        public string StyleCode { get; set; }

        public string Colorway { get; set; }

        public int FK_User { get; set; }

        public DateTime SubmitDate { get; set; }

        public int Status { get; set; }

        public string FK_Brand { get; set; }

        public string Image { get; set; }


        public int BrandId { get; set; }
        public virtual Brand BrandNavigation { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
