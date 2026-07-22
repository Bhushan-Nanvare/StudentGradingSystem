namespace StudentGradingSystem.Api.DTOs.Dashboard;

public class RecentActivityDto
{
    public string ActivityType { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public DateTime Timestamp { get; set; }
}
