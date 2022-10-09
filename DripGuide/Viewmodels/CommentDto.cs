using System.ComponentModel.DataAnnotations;

namespace DripGuide.Viewmodels
{
    public class CommentDto
    {
        [Required]
        [StringLength(maximumLength: 200, MinimumLength = 2, 
            ErrorMessage = "Must be between 2 and 200 characters.")]
        public string Text { get; set; }

        [Required]
        [Range(1, int.MaxValue, 
            ErrorMessage = "Enter a vild digit.")]
        public int User { get; set; }

        [Required]
        [Range(1, int.MaxValue, 
            ErrorMessage = "Enter a vild digit.")]
        public int PostId { get; set; }
    }
}
