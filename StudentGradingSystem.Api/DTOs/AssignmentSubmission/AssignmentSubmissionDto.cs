namespace StudentGradingSystem.Api.DTOs.AssignmentSubmission;

public class AssignmentSubmissionDto
{
    public int Id { get; set; }

    public int AssignmentId { get; set; }

    public int StudentId { get; set; }

    public string StudentName { get; set; } = "";

    public string FilePath { get; set; } = "";

    public DateTime SubmittedAt { get; set; }

    public decimal? Marks { get; set; }

    public string Remarks { get; set; } = "";

    public string Status { get; set; } = "";
}