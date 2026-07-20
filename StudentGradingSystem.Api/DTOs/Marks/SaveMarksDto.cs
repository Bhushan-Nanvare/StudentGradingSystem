namespace StudentGradingSystem.Api.DTOs.Marks;

public class SaveMarksDto
{
    public int SubjectId { get; set; }

    public string AssessmentType { get; set; } = string.Empty;

    public decimal MaxMarks { get; set; }

    public List<StudentMarkDto> Students { get; set; } = [];
}