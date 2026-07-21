namespace StudentGradingSystem.Api.DTOs.StudentPortal;

public class StudentMarkDto
{
    public string Subject { get; set; } = string.Empty;

    public string AssessmentType { get; set; } = string.Empty;

    public decimal MarksObtained { get; set; }

    public decimal MaxMarks { get; set; }

    public decimal Percentage { get; set; }
}