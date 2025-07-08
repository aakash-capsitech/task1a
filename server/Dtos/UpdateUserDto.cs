namespace MyMongoApp.Dtos
{
    public class UpdateUserDto
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Role { get; set; }
        public string? Phone { get; set; }
        public string? Nationality { get; set; }
        public string? Address { get; set; }
        public List<string>? ConfigRoles { get; set; }
    }
}
