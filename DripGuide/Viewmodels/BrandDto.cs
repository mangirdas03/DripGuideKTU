using DripGuide.Models;
using System.ComponentModel.DataAnnotations;

namespace DripGuide.Viewmodels
{
    public class BrandDto
    {
        [Required]
        [StringLength(maximumLength: 50, MinimumLength = 2,
            ErrorMessage = "Must be between 2 and 50 characters.")]
        public string Name { get; set; }

        [Required]
        [StringLength(maximumLength: 500, MinimumLength = 2,
            ErrorMessage = "Must be between 2 and 500 characters.")]
        public string Description { get; set; }

        [Required]
        public DateTime? EstablishmentDate { get; set; }

        [Required]
        [StringLength(maximumLength: 50, MinimumLength = 2,
            ErrorMessage = "Must be between 2 and 50 characters.")]
        public string Founder { get; set; }

        [Required]
        [StringLength(maximumLength: 50, MinimumLength = 2,
            ErrorMessage = "Must be between 2 and 50 characters.")]
        public string Headquarters { get; set; }

        [Required]
        [StringLength(maximumLength: 200, MinimumLength = 2,
            ErrorMessage = "Must be between 2 and 200 characters.")]
        public string Image { get; set; }

    }
}
