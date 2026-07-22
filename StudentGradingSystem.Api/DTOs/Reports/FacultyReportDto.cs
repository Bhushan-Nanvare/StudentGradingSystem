namespace StudentGradingSystem.Api.DTOs.Reports;

public class FacultyReportDto
{
    public int FacultyId { get; set; }

    public string EmployeeCode { get; set; } = string.Empty;

    public string FacultyName { get; set; } = string.Empty;

    public string DepartmentName { get; set; } = string.Empty;

    public string Designation { get; set; } = string.Empty;

    public int AssignedSubjectsCount { get; set; }

    public int TotalStudentsTaught { get; set; }
}
