namespace StudentGradingSystem.Api.DTOs.StudentPortal;

public class StudentProfileDto
{
    public int Id { get; set; }

    public string Name { get; set; } = "";

    public string RollNumber { get; set; } = "";

    public string Email { get; set; } = "";

    public int Age { get; set; }

    public double CGPA { get; set; }

    public string Department { get; set; } = "";
}