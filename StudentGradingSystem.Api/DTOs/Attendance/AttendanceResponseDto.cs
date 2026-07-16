namespace StudentGradingSystem.Api.DTOs.Attendance;

public class AttendanceResponseDto
{
    public int StudentId { get; set; }

    public string StudentName { get; set; } = string.Empty;

    public bool IsPresent { get; set; }

    public DateOnly Date { get; set; }
}