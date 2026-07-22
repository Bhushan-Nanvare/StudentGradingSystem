namespace StudentGradingSystem.Api.DTOs.FacultyPortal;

public class FacultyDashboardDto
{
    public string FacultyName { get; set; } = string.Empty;

    public string EmployeeCode { get; set; } = string.Empty;

    public string Department { get; set; } = string.Empty;

    public string Designation { get; set; } = string.Empty;

    public int TotalSubjects { get; set; }

    public int TotalStudents { get; set; }

    public int TotalAssignments { get; set; }
}
