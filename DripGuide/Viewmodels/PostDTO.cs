using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DripGuide.Viewmodels
{
    public class PostDto
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string Description2 { get; set; }

        public string Material { get; set; }

        public string Price { get; set; }

        public DateTime ReleaseDate { get; set; }

        public string StyleCode { get; set; }

        public string Colorway { get; set; }

        public string FK_Brand { get; set; }

        public string Image { get; set; }
    }
}
