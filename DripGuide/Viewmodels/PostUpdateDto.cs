using System.ComponentModel.DataAnnotations;

namespace DripGuide.Viewmodels
{
    public class PostUpdateDto
    {
        [StringLength(maximumLength: 100, MinimumLength = 2,
            ErrorMessage = "Must be between 5 and 100 characters.")]
        public string? Title { get; set; }

        [StringLength(maximumLength: 500, MinimumLength = 2,
            ErrorMessage = "Must be between 5 and 500 characters.")]
        public string? Description { get; set; }

        public string? Description2 { get; set; }

        [StringLength(maximumLength: 100, MinimumLength = 2,
            ErrorMessage = "Must be between 5 and 100 characters.")]
        public string? Material { get; set; }

        [StringLength(maximumLength: 100, MinimumLength = 2,
            ErrorMessage = "Must be between 5 and 100 characters.")]
        public string? Price { get; set; }

        public DateTime? ReleaseDate { get; set; }

        [StringLength(maximumLength: 100, MinimumLength = 2,
            ErrorMessage = "Must be between 5 and 100 characters.")]
        public string? StyleCode { get; set; }

        [StringLength(maximumLength: 100, MinimumLength = 2,
            ErrorMessage = "Must be between 5 and 100 characters.")]
        public string? Colorway { get; set; }

        [StringLength(maximumLength: 100, MinimumLength = 2,
            ErrorMessage = "Must be between 5 and 100 characters.")]
        public string? FK_Brand { get; set; }

        public string? Image { get; set; }

        [Range(1, int.MaxValue,
            ErrorMessage = "Enter a vild digit.")]
        public int? BrandId { get; set; }
    }
}
