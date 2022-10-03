using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DripGuide.Viewmodels
{
    public class PasswordDTO
    {
        public string currentPass { get; set; }
        public string newPass { get; set; }
        public string newPassConfirm { get; set; }
    }
}
