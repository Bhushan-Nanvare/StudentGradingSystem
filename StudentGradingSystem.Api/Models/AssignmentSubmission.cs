using System.ComponentModel.DataAnnotations;

namespace StudentGradingSystem.Api.Models;

public class AssignmentSubmission
{
    public int Id { get; set; }

    public int AssignmentId { get; set; }
    public Assignment Assignment { get; set; } = null!;

    public int StudentId { get; set; }
    public Student Student { get; set; } = null!;

    [MaxLength(500)]
    public string FilePath { get; set; } = string.Empty;

    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

    public decimal? Marks { get; set; }

    public string Remarks { get; set; } = string.Empty;

    public string Status { get; set; } = "Submitted";
}