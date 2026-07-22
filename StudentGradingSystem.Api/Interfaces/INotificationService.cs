using StudentGradingSystem.Api.DTOs.Notifications;

namespace StudentGradingSystem.Api.Interfaces;

public interface INotificationService
{
    Task SendNotificationAsync(CreateNotificationDto dto);

    Task NotifyAssignmentCreatedAsync(int subjectId, string assignmentTitle, DateOnly dueDate);

    Task NotifyAssignmentDueAsync(int subjectId, string assignmentTitle, DateOnly dueDate);

    Task NotifyMarksPublishedAsync(int subjectId, string assessmentType);

    Task NotifyAttendanceWarningAsync(int studentId, int subjectId, double attendancePercentage);

    Task<List<NotificationDto>> GetUserNotificationsAsync(int userId);

    Task<bool> MarkAsReadAsync(int notificationId, int userId);

    Task<bool> MarkAllAsReadAsync(int userId);
}
