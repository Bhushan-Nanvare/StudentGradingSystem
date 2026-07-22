namespace StudentGradingSystem.Api.DTOs.Analytics;

public class SubjectAnalyticsDto
{
    public int SubjectId { get; set; }

    public string SubjectCode { get; set; } = string.Empty;

    public string SubjectName { get; set; } = string.Empty;

    public int EnrolledStudents { get; set; }

    public double AverageMarks { get; set; }

    public double HighestMarks { get; set; }

    public double LowestMarks { get; set; }

    public double AttendancePercentage { get; set; }

    public double PassPercentage { get; set; }
}
