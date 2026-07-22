namespace StudentGradingSystem.Api.DTOs.FacultyPortal;

public class FacultySubjectDto
{
    public int Id { get; set; }

    public string SubjectCode { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public decimal Credits { get; set; }

    public int Semester { get; set; }

    public string DepartmentName { get; set; } = string.Empty;
}
