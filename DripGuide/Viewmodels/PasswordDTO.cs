using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DripGuide.Viewmodels
{
    public class PasswordDTO
    {
        [Required]
        [StringLength(maximumLength: 50, MinimumLength = 5,
            ErrorMessage = "Must be between 5 and 50 characters.")]
        [DataType(DataType.Password)]
        public string currentPass { get; set; }

        [Required]
        [StringLength(maximumLength: 50, MinimumLength = 5,
            ErrorMessage = "Must be between 5 and 50 characters.")]
        [DataType(DataType.Password)]
        public string newPass { get; set; }

        [Required]
        [StringLength(maximumLength: 50, MinimumLength = 5,
            ErrorMessage = "Must be between 5 and 50 characters.")]
        [DataType(DataType.Password)]
        [Compare("newPass",
            ErrorMessage = "Passwords don't match.")]
        public string newPassConfirm { get; set; }
    }
}
