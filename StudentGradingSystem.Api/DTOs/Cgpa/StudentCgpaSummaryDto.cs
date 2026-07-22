namespace StudentGradingSystem.Api.DTOs.Cgpa;

public class StudentCgpaSummaryDto
{
    public int StudentId { get; set; }

    public string StudentName { get; set; } = string.Empty;

    public string RollNumber { get; set; } = string.Empty;

    public string DepartmentName { get; set; } = string.Empty;

    public double OverallCGPA { get; set; }

    public decimal TotalEarnedCredits { get; set; }

    public List<SemesterGpaDto> SemesterGPAs { get; set; } = new();
}
