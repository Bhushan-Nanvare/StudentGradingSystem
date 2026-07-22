namespace StudentGradingSystem.Api.DTOs.Reports;

public class DepartmentReportDto
{
    public int DepartmentId { get; set; }

    public string DepartmentName { get; set; } = string.Empty;

    public int StudentCount { get; set; }

    public int FacultyCount { get; set; }

    public int SubjectCount { get; set; }

    public double AverageCGPA { get; set; }
}
