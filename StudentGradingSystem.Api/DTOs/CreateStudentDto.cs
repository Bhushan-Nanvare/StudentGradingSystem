using System.ComponentModel.DataAnnotations;

namespace StudentGradingSystem.Api.DTOs;

public class CreateStudentDto
{
    [Required]
    public string Name { get; set; } = "";

    [Range(1, 100)]
    public int Age { get; set; }

    [Required]
    public string Department { get; set; } = "";

    [Range(0, 10)]
    public double CGPA { get; set; }
}