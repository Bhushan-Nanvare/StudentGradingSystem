namespace StudentGradingSystem.Api.DTOs.Reports;

public class SubjectReportDto
{
    public int SubjectId { get; set; }

    public string SubjectCode { get; set; } = string.Empty;

    public string SubjectName { get; set; } = string.Empty;

    public string DepartmentName { get; set; } = string.Empty;

    public string FacultyName { get; set; } = string.Empty;

    public decimal Credits { get; set; }

    public int Semester { get; set; }

    public int EnrolledStudentsCount { get; set; }

    public decimal AverageMarks { get; set; }
}
