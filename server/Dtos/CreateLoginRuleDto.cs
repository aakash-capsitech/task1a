namespace MyMongoApp.Dtos
{
    public class CreateLoginRuleDto
    {
        public List<string> UserIds { get; set; } = new();
        public string Restriction { get; set; } = "deny";
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}
