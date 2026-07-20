using System.ComponentModel.DataAnnotations;

namespace StudentGradingSystem.Api.DTOs.Assignment;

public class CreateAssignmentDto
{
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public int SubjectId { get; set; }

    [Required]
    public DateOnly DueDate { get; set; }

    [Range(1, 1000)]
    public decimal MaxMarks { get; set; }
}