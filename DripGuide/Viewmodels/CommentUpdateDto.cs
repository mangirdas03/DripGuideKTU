using System.ComponentModel.DataAnnotations;

namespace DripGuide.Viewmodels
{
    public class CommentUpdateDto
    {
        [StringLength(maximumLength: 200, MinimumLength = 2, 
            ErrorMessage = "Must be between 2 and 200 characters.")]
        public string? Text { get; set; }
    }
}
