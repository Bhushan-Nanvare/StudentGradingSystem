using StudentGradingSystem.Api.DTOs.StudentPortal;

namespace StudentGradingSystem.Api.Interfaces;

public interface IStudentPortalService
{
    Task<StudentDashboardDto> GetDashboard(int applicationUserId);

    Task<StudentProfileDto?> GetProfile(int applicationUserId);

    Task<List<StudentSubjectDto>> GetSubjects(int applicationUserId);

    Task<List<StudentAttendanceDto>> GetAttendance(int applicationUserId);

    Task<List<StudentMarkDto>> GetMarks(int applicationUserId);

    Task<List<StudentAssignmentDto>> GetAssignments(int applicationUserId);
}