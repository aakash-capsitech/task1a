namespace MyMongoApp.Dtos
{
    public class CreateUserDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public List<string> ConfigRoles { get; set; } = new();
}

}
