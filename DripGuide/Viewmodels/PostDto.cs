using System.ComponentModel.DataAnnotations;

namespace DripGuide.Viewmodels
{
    public class PostDto
    {
        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 2,
            ErrorMessage = "Must be between 5 and 100 characters.")]
        public string Title { get; set; }

        [Required]
        [StringLength(maximumLength: 500, MinimumLength = 2,
            ErrorMessage = "Must be between 5 and 500 characters.")]
        public string Description { get; set; }

        [Required]
        [StringLength(maximumLength: 300, MinimumLength = 2,
            ErrorMessage = "Must be between 5 and 300 characters.")]
        public string Description2 { get; set; }

        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 2,
            ErrorMessage = "Must be between 5 and 100 characters.")]
        public string Material { get; set; }

        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 2,
            ErrorMessage = "Must be between 5 and 100 characters.")]
        public string Price { get; set; }

        [Required]
        public DateTime? ReleaseDate { get; set; }

        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 2,
            ErrorMessage = "Must be between 5 and 100 characters.")]
        public string StyleCode { get; set; }

        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 2,
            ErrorMessage = "Must be between 5 and 100 characters.")]
        public string Colorway { get; set; }

        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 2,
            ErrorMessage = "Must be between 5 and 100 characters.")]
        public string FK_Brand { get; set; }

        [Required]
        [StringLength(maximumLength: 200, MinimumLength = 2,
            ErrorMessage = "Must be between 5 and 200 characters.")]
        public string Image { get; set; }

        [Required]
        [Range(1, int.MaxValue,
            ErrorMessage = "Enter a vild digit.")]
        public int BrandId { get; set; }
    }
}
