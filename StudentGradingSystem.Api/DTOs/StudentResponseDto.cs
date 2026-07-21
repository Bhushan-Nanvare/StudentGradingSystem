namespace StudentGradingSystem.Api.DTOs;

public class StudentResponseDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public int Age { get; set; }

    public string RollNumber { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public double CGPA { get; set; }

    public int DepartmentId { get; set; }

    public string DepartmentName { get; set; } = string.Empty;
}