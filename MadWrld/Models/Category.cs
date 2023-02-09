using System.Collections.Generic;

namespace MadWrld.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<MLTemplate> Templates { get; set; }
    }
}
