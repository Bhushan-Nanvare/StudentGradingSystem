using StudentGradingSystem.Api.DTOs.StudentPortal;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Interfaces;

public interface IStudentPortalRepository
{
    Task<Student?> GetStudentWithDetailsAsync(int applicationUserId);

    Task<Student?> GetStudentByApplicationUserIdAsync(int applicationUserId);

    Task<List<StudentSubjectDto>> GetSubjectsAsync(int studentId);

    Task<List<StudentAttendanceDto>> GetAttendanceAsync(int studentId);

    Task<List<StudentMarkDto>> GetMarksAsync(int studentId);

    Task<int> GetPendingAssignmentsCountAsync(int studentId);

    Task<List<Attendance>> GetAllAttendanceForStudentAsync(int studentId);

    Task<List<StudentAssignmentDto>> GetAssignmentsAsync(int studentId);
}
