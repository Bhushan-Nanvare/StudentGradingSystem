using System.ComponentModel.DataAnnotations;

namespace StudentGradingSystem.Api.DTOs;

public class UpdateFacultyDto
{
    [Required]
    [MaxLength(20)]
    public string EmployeeCode { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Designation { get; set; } = string.Empty;

    [Range(0, 1000000)]
    public decimal Salary { get; set; }

    public DateTime JoiningDate { get; set; }

    [Required]
    public int DepartmentId { get; set; }
}