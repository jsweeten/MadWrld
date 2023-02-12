using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;

namespace MadWrld.Models
{
    public class MLTemplate
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int UserId { get; set; }
        public UserProfile User { get; set; }
        public List<MLAnswerTemplate> AnswerTemplates { get; set; }
        public List<Category> Categories { get; set; }
    }
}
