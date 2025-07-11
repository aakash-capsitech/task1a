public class AuditLog
{
    public string Id { get; set; }
    public string EntityType { get; set; } = "LoginRule";
    public string EntityId { get; set; }  // the LoginRule ID
    public string Action { get; set; }    // Created, Updated, Deleted
    public string PerformedBy { get; set; } // Optional: User who did it
    public string Description { get; set; } // What changed
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
