namespace StudentGradingSystem.Api.DTOs.Cgpa;

public class SubjectGradeDto
{
    public int SubjectId { get; set; }

    public string SubjectCode { get; set; } = string.Empty;

    public string SubjectName { get; set; } = string.Empty;

    public decimal Credits { get; set; }

    public int Semester { get; set; }

    public decimal TotalMarksObtained { get; set; }

    public decimal TotalMaxMarks { get; set; }

    public double Percentage { get; set; }

    public string LetterGrade { get; set; } = string.Empty;

    public double GradePoint { get; set; }
}
