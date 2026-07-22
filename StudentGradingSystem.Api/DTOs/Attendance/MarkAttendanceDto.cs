namespace StudentGradingSystem.Api.DTOs.Attendance;

public class MarkAttendanceDto
{
    public int SubjectId { get; set; }

    public DateOnly Date { get; set; }

    public List<StudentAttendanceDto> Students { get; set; } = new();
}