namespace StudentGradingSystem.Api.Models;

public class Mark
{
    public int Id { get; set; }

    public int StudentId { get; set; }

    public Student Student { get; set; } = null!;

    public int SubjectId { get; set; }

    public Subject Subject { get; set; } = null!;

    public int FacultyId { get; set; }

    public Faculty Faculty { get; set; } = null!;

    public string AssessmentType { get; set; } = string.Empty;

    public decimal MarksObtained { get; set; }

    public decimal MaxMarks { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}