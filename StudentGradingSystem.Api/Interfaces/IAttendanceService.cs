using StudentGradingSystem.Api.DTOs.Attendance;

namespace StudentGradingSystem.Api.Interfaces;

public interface IAttendanceService
{
    Task MarkAttendance(
        int facultyUserId,
        MarkAttendanceDto dto);

    Task<List<AttendanceResponseDto>>
        GetAttendance(int subjectId, DateOnly date);
}