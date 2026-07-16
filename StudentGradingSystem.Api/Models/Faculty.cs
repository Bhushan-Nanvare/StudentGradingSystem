namespace StudentGradingSystem.Api.Models;

public class Faculty
{
    public int Id { get; set; }

    public string EmployeeCode { get; set; } = string.Empty;

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Designation { get; set; } = string.Empty;

    public decimal Salary { get; set; }

    public DateTime JoiningDate { get; set; }

    // Foreign Key
    public int DepartmentId { get; set; }

    // Navigation Property
    public Department Department { get; set; } = null!;

    // One Faculty teaches many Subjects
    public List<Subject> Subjects { get; set; } = new();

    public int? ApplicationUserId { get; set; }

    public ApplicationUser? ApplicationUser { get; set; }
}