namespace StudentGradingSystem.Api.DTOs.FacultyPortal;

public class FacultyStudentDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string DepartmentName { get; set; } = string.Empty;

    public double CGPA { get; set; }
}
