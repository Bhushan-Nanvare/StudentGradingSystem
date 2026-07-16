namespace StudentGradingSystem.Api.DTOs.Teacher;

public class TeacherStudentDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string DepartmentName { get; set; } = string.Empty;

    public double CGPA { get; set; }
}