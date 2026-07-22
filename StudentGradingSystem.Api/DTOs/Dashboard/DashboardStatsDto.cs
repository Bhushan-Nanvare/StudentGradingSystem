namespace StudentGradingSystem.Api.DTOs.Dashboard;

public class DashboardStatsDto
{
    public int StudentCount { get; set; }

    public int FacultyCount { get; set; }

    public int DepartmentCount { get; set; }

    public int SubjectCount { get; set; }

    public int AssignmentCount { get; set; }

    public AttendanceStatsDto AttendanceStats { get; set; } = new();

    public MarksStatsDto MarksStats { get; set; } = new();

    public List<RecentActivityDto> RecentActivities { get; set; } = new();
}