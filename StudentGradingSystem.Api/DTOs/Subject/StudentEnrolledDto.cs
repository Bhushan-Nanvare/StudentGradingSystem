namespace StudentGradingSystem.Api.DTOs.Subject;

public class StudentEnrolledDto
{
    public int StudentId { get; set; }

    public string Name { get; set; } = string.Empty;

    public string RollNumber { get; set; } = string.Empty;

    public string DepartmentName { get; set; } = string.Empty;

    public double CGPA { get; set; }
}
