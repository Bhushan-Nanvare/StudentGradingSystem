using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.Notifications;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Services;

public class NotificationService : INotificationService
{
    private readonly INotificationRepository _notificationRepository;
    private readonly AppDbContext _context;

    public NotificationService(
        INotificationRepository notificationRepository,
        AppDbContext context)
    {
        _notificationRepository = notificationRepository;
        _context = context;
    }

    public async Task SendNotificationAsync(CreateNotificationDto dto)
    {
        await _notificationRepository.AddNotificationAsync(new Notification
        {
            UserId = dto.UserId,
            Type = dto.Type,
            Title = dto.Title,
            Message = dto.Message,
            IsRead = false,
            CreatedAt = DateTime.UtcNow
        });
    }

    public async Task NotifyAssignmentCreatedAsync(int subjectId, string assignmentTitle, DateOnly dueDate)
    {
        var subject = await _context.Subjects.FindAsync(subjectId);
        string subjectName = subject?.Name ?? "Subject";

        var enrolledUserIds = await _context.StudentSubjects
            .Where(ss => ss.SubjectId == subjectId && ss.Student.ApplicationUserId.HasValue)
            .Select(ss => ss.Student.ApplicationUserId!.Value)
            .ToListAsync();

        var notifications = enrolledUserIds.Select(userId => new Notification
        {
            UserId = userId,
            Type = "AssignmentCreated",
            Title = "New Assignment Posted",
            Message = $"New assignment '{assignmentTitle}' has been posted for {subjectName}. Due date: {dueDate:yyyy-MM-dd}.",
            IsRead = false,
            CreatedAt = DateTime.UtcNow
        });

        await _notificationRepository.AddNotificationsAsync(notifications);
    }

    public async Task NotifyAssignmentDueAsync(int subjectId, string assignmentTitle, DateOnly dueDate)
    {
        var subject = await _context.Subjects.FindAsync(subjectId);
        string subjectName = subject?.Name ?? "Subject";

        var enrolledUserIds = await _context.StudentSubjects
            .Where(ss => ss.SubjectId == subjectId && ss.Student.ApplicationUserId.HasValue)
            .Select(ss => ss.Student.ApplicationUserId!.Value)
            .ToListAsync();

        var notifications = enrolledUserIds.Select(userId => new Notification
        {
            UserId = userId,
            Type = "AssignmentDue",
            Title = "Assignment Due Reminder",
            Message = $"Reminder: Assignment '{assignmentTitle}' for {subjectName} is due on {dueDate:yyyy-MM-dd}.",
            IsRead = false,
            CreatedAt = DateTime.UtcNow
        });

        await _notificationRepository.AddNotificationsAsync(notifications);
    }

    public async Task NotifyMarksPublishedAsync(int subjectId, string assessmentType)
    {
        var subject = await _context.Subjects.FindAsync(subjectId);
        string subjectName = subject?.Name ?? "Subject";

        var enrolledUserIds = await _context.StudentSubjects
            .Where(ss => ss.SubjectId == subjectId && ss.Student.ApplicationUserId.HasValue)
            .Select(ss => ss.Student.ApplicationUserId!.Value)
            .ToListAsync();

        var notifications = enrolledUserIds.Select(userId => new Notification
        {
            UserId = userId,
            Type = "MarksPublished",
            Title = "Marks Published",
            Message = $"{assessmentType} marks for {subjectName} have been published. Check your marks portal.",
            IsRead = false,
            CreatedAt = DateTime.UtcNow
        });

        await _notificationRepository.AddNotificationsAsync(notifications);
    }

    public async Task NotifyAttendanceWarningAsync(int studentId, int subjectId, double attendancePercentage)
    {
        var student = await _context.Students.FindAsync(studentId);
        if (student == null || !student.ApplicationUserId.HasValue)
            return;

        var subject = await _context.Subjects.FindAsync(subjectId);
        string subjectName = subject?.Name ?? "Subject";

        await _notificationRepository.AddNotificationAsync(new Notification
        {
            UserId = student.ApplicationUserId.Value,
            Type = "AttendanceWarning",
            Title = "Low Attendance Warning",
            Message = $"Warning: Your attendance in {subjectName} is currently {attendancePercentage:F1}%, which is below requirement.",
            IsRead = false,
            CreatedAt = DateTime.UtcNow
        });
    }

    public async Task<List<NotificationDto>> GetUserNotificationsAsync(int userId)
    {
        return await _notificationRepository.GetUserNotificationsAsync(userId);
    }

    public async Task<bool> MarkAsReadAsync(int notificationId, int userId)
    {
        return await _notificationRepository.MarkAsReadAsync(notificationId, userId);
    }

    public async Task<bool> MarkAllAsReadAsync(int userId)
    {
        return await _notificationRepository.MarkAllAsReadAsync(userId);
    }
}
