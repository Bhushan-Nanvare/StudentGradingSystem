using StudentGradingSystem.Api.DTOs.Notifications;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Interfaces;

public interface INotificationRepository
{
    Task AddNotificationAsync(Notification notification);

    Task AddNotificationsAsync(IEnumerable<Notification> notifications);

    Task<List<NotificationDto>> GetUserNotificationsAsync(int userId);

    Task<bool> MarkAsReadAsync(int notificationId, int userId);

    Task<bool> MarkAllAsReadAsync(int userId);
}
