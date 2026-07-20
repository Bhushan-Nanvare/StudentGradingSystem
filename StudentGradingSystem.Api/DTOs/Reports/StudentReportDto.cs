namespace StudentGradingSystem.Api.DTOs.Reports;

public class StudentReportDto
{
    public int StudentId { get; set; }

    public string StudentName { get; set; } = string.Empty;

    public decimal AttendancePercentage { get; set; }

    public decimal CIA1 { get; set; }

    public decimal CIA2 { get; set; }

    public decimal Assignment { get; set; }

    public decimal Total { get; set; }
}