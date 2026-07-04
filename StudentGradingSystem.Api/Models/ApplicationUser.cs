namespace StudentGradingSystem.Api.Models;

public class ApplicationUser
{
    public int Id { get; set; }

    public string Username { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public string Role { get; set; } = "Student";

    public List<RefreshToken> RefreshTokens { get; set; } = new();
}