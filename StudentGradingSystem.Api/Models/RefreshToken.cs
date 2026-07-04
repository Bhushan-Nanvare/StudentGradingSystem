namespace StudentGradingSystem.Api.Models;

public class RefreshToken
{
    public int Id { get; set; }

    public string Token { get; set; } = string.Empty;

    public DateTime ExpiresAt { get; set; }

    public bool IsRevoked { get; set; }

    public int UserId { get; set; }

    public ApplicationUser User { get; set; } = null!;
}