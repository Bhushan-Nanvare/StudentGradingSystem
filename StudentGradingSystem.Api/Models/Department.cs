namespace StudentGradingSystem.Api.Models;

public class Department
{
    public int Id { get; set; }

    public string DepartmentCode { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public List<Student> Students { get; set; } = new();

    public List<Faculty> Faculties { get; set; } = new();

    public List<Subject> Subjects { get; set; } = new();
}