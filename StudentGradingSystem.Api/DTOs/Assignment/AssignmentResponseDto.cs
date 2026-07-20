namespace StudentGradingSystem.Api.DTOs.Assignment;

public class AssignmentResponseDto
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public DateOnly DueDate { get; set; }

    public decimal MaxMarks { get; set; }

    public string SubjectName { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}