namespace StudentGradingSystem.Api.DTOs.Reports;

public class MarksReportDto
{
    public int SubjectId { get; set; }

    public string SubjectName { get; set; } = string.Empty;

    public string AssessmentType { get; set; } = string.Empty;

    public int StudentsGraded { get; set; }

    public decimal AverageMarks { get; set; }

    public decimal HighestMarks { get; set; }

    public decimal LowestMarks { get; set; }
}
