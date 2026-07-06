using System.ComponentModel.DataAnnotations;

namespace StudentGradingSystem.Api.DTOs;

public class UpdateDepartmentDto
{
    [Required]
    [MaxLength(20)]
    public string DepartmentCode { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;
}