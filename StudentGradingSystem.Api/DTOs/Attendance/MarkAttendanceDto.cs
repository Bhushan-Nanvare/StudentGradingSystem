namespace StudentGradingSystem.Api.DTOs.Attendance;

public class MarkAttendanceDto
{
    public int StudentId { get; set; }

    public int SubjectId { get; set; }

    public bool IsPresent { get; set; }
}