using System.ComponentModel.DataAnnotations;

namespace StudentGradingSystem.Api.Models;

public class Assignment
{
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string Description { get; set; } = string.Empty;

    public int SubjectId { get; set; }
    public Subject Subject { get; set; } = null!;

    public int FacultyId { get; set; }
    public Faculty Faculty { get; set; } = null!;

    public DateOnly DueDate { get; set; }

    public decimal MaxMarks { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<AssignmentSubmission> Submissions { get; set; }
    = new List<AssignmentSubmission>();
}