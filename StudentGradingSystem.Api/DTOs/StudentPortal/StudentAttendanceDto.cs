namespace StudentGradingSystem.Api.DTOs.StudentPortal;

public class StudentAttendanceDto
{
    public string Subject { get; set; } = "";

    public int TotalClasses { get; set; }

    public int PresentClasses { get; set; }

    public double Percentage { get; set; }
}