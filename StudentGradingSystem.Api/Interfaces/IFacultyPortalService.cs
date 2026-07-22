using StudentGradingSystem.Api.DTOs.Attendance;
using StudentGradingSystem.Api.DTOs.Assignment;
using StudentGradingSystem.Api.DTOs.AssignmentSubmission;
using StudentGradingSystem.Api.DTOs.FacultyPortal;
using StudentGradingSystem.Api.DTOs.Marks;

namespace StudentGradingSystem.Api.Interfaces;

public interface IFacultyPortalService
{
    Task<FacultyDashboardDto> GetDashboard(int userId);

    Task<List<FacultySubjectDto>> GetMySubjects(int userId);

    Task<List<FacultyStudentDto>> GetStudentsBySubject(int subjectId);

    Task<List<AttendanceResponseDto>> GetAttendanceBySubject(int subjectId, DateOnly date);

    Task<List<MarkResponseDto>> GetMarksBySubject(int subjectId, string assessmentType);

    Task<List<AssignmentResponseDto>> GetAssignmentsBySubject(int subjectId);

    Task<List<AssignmentSubmissionDto>> GetSubmissionsByAssignment(int assignmentId);
}
