namespace StudentGradingSystem.Api.DTOs.Marks;

public class MarkResponseDto
{
    public int StudentId { get; set; }

    public string StudentName { get; set; } = string.Empty;

    public decimal MarksObtained { get; set; }

    public decimal MaxMarks { get; set; }

    public string AssessmentType { get; set; } = string.Empty;
}