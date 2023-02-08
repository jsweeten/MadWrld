using System;
using System.Collections.Generic;

namespace MadWrld.Models
{
    public class MadLib
    {
        public int Id { get; set; }
        public int TemplateId { get; set; }
        public int UserProfileId { get; set; }
        public MLTemplate Template { get; set; }
        public UserProfile UserProfile { get; set; }
        public string Inputs { get; set; }
        public string Story { get; set; }
    }
}