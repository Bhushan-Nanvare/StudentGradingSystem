namespace StudentGradingSystem.Api.DTOs.StudentPortal;

public class StudentSubjectDto
{
    public int Id { get; set; }

    public string SubjectCode { get; set; } = "";

    public string SubjectName { get; set; } = "";

    public decimal Credits { get; set; }

    public int Semester { get; set; }

    public string Faculty { get; set; } = "";
}