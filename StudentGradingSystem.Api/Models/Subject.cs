using System.ComponentModel.DataAnnotations;

namespace StudentGradingSystem.Api.Models;

public class Subject
{
    public int Id { get; set; }

    [Required]
    [MaxLength(20)]
    public string SubjectCode { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Range(0.5, 10)]
    public decimal Credits { get; set; }

    [Range(1, 8)]
    public int Semester { get; set; }

    public bool IsDeleted { get; set; } = false;

    public DateTime? DeletedAt { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }

    public string? CreatedBy { get; set; }

    public string? UpdatedBy { get; set; }
}