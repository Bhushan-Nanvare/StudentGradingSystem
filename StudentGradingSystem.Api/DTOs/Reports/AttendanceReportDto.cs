namespace StudentGradingSystem.Api.DTOs.Reports;

public class AttendanceReportDto
{
    public int SubjectId { get; set; }

    public string SubjectCode { get; set; } = string.Empty;

    public string SubjectName { get; set; } = string.Empty;

    public int TotalClassesConducted { get; set; }

    public int TotalPresentRecords { get; set; }

    public int TotalAbsentRecords { get; set; }

    public double AverageAttendancePercentage { get; set; }
}
