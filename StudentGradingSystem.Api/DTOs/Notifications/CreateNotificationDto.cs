namespace StudentGradingSystem.Api.DTOs.Notifications;

public class CreateNotificationDto
{
    public int UserId { get; set; }

    public string Type { get; set; } = string.Empty; // AssignmentCreated, AssignmentDue, MarksPublished, AttendanceWarning

    public string Title { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;
}
