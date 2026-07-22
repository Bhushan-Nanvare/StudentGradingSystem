namespace StudentGradingSystem.Api.DTOs.Analytics;

public class OverallAnalyticsDto
{
    public double OverallAttendancePercentage { get; set; }

    public double AverageMarks { get; set; }

    public double HighestMarks { get; set; }

    public double LowestMarks { get; set; }

    public double PassPercentage { get; set; }

    public int TotalStudents { get; set; }

    public int TotalSubjects { get; set; }
}
