using System.ComponentModel.DataAnnotations;

namespace DripGuide.Viewmodels
{
    public class BrandUpdateDto
    {
        [StringLength(maximumLength: 50, MinimumLength = 5,
            ErrorMessage = "Must be between 5 and 50 characters.")]
        public string? Name { get; set; }

        [StringLength(maximumLength: 500, MinimumLength = 10,
            ErrorMessage = "Must be between 10 and 500 characters.")]
        public string? Description { get; set; }

        public DateTime? EstablishmentDate { get; set; }

        [StringLength(maximumLength: 50, MinimumLength = 2,
            ErrorMessage = "Must be between 2 and 50 characters.")]
        public string? Founder { get; set; }

        [StringLength(maximumLength: 50, MinimumLength = 2,
            ErrorMessage = "Must be between 2 and 50 characters.")]
        public string? Headquarters { get; set; }

        [StringLength(maximumLength: 200, MinimumLength = 2,
            ErrorMessage = "Must be between 2 and 200 characters.")]
        public string? Image { get; set; }

    }
}
