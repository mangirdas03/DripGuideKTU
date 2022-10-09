using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DripGuide.Viewmodels
{
    public class LoginDTO
    {
        [Required]
        [StringLength(maximumLength: 50, MinimumLength = 5,
            ErrorMessage = "Must be between 5 and 50 characters.")]
        public string Name { get; set; }

        [Required]
        [StringLength(maximumLength: 50, MinimumLength = 5,
            ErrorMessage = "Must be between 5 and 50 characters.")]
        public string Password { get; set; }

    }
}
