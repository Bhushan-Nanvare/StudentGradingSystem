using StudentGradingSystem.Api.DTOs.Attendance;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Interfaces;

public interface IAttendanceRepository
{
    Task<Attendance?> GetExistingAttendanceAsync(
        int studentId, int subjectId, DateOnly date);

    Task AddAttendanceAsync(Attendance attendance);

    Task<List<AttendanceResponseDto>> GetAttendanceBySubjectAsync(
        int subjectId, DateOnly date);

    Task SaveChangesAsync();
}
