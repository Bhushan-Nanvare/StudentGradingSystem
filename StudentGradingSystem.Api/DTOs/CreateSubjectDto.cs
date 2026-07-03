using System.ComponentModel.DataAnnotations;

namespace StudentGradingSystem.Api.DTOs;

public class CreateSubjectDto
{
    [Required]
    [MaxLength(20)]
    public string SubjectCode { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Range(1, 10)]
    public decimal Credits { get; set; }

    [Range(1, 8)]
    public int Semester { get; set; }
}