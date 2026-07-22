namespace StudentGradingSystem.Api.DTOs.Analytics;

public class DepartmentAnalyticsDto
{
    public int DepartmentId { get; set; }

    public string DepartmentName { get; set; } = string.Empty;

    public int TotalStudents { get; set; }

    public double AverageCGPA { get; set; }

    public double AttendancePercentage { get; set; }

    public double PassPercentage { get; set; }
}
