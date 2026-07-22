namespace StudentGradingSystem.Api.DTOs.Dashboard;

public class AttendanceStatsDto
{
    public int TotalRecords { get; set; }

    public int PresentCount { get; set; }

    public int AbsentCount { get; set; }

    public double OverallAttendancePercentage { get; set; }
}
