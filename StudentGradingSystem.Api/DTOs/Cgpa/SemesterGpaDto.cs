namespace StudentGradingSystem.Api.DTOs.Cgpa;

public class SemesterGpaDto
{
    public int Semester { get; set; }

    public double GPA { get; set; }

    public decimal TotalCredits { get; set; }

    public List<SubjectGradeDto> SubjectGrades { get; set; } = new();
}
