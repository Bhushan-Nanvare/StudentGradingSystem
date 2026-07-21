namespace StudentGradingSystem.Api.DTOs.StudentPortal;

public class StudentDashboardDto
{
    public string StudentName { get; set; } = "";

    public string RollNumber { get; set; } = "";

    public string Department { get; set; } = "";

    public double CGPA { get; set; }

    public int TotalSubjects { get; set; }

    public double AttendancePercentage { get; set; }

    public int PendingAssignments { get; set; }
}