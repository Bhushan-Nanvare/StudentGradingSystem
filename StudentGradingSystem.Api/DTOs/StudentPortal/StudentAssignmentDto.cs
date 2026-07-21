namespace StudentGradingSystem.Api.DTOs.StudentPortal;

public class StudentAssignmentDto
{
    public int AssignmentId { get; set; }

    public string Title { get; set; } = "";

    public string Description { get; set; } = "";

    public string Subject { get; set; } = "";

    public DateOnly DueDate { get; set; }

    public decimal MaxMarks { get; set; }

    public bool Submitted { get; set; }

    public decimal? MarksObtained { get; set; }
}