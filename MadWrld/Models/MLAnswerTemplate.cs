namespace MadWrld.Models
{
    public class MLAnswerTemplate
    {
        public int Id { get; set; }
        public int TemplateId { get; set; }
        public int Position { get; set; }
        public string Content { get; set; }
        public string PartOfSpeech { get; set; }
    }
}
