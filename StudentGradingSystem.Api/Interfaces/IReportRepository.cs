using StudentGradingSystem.Api.DTOs.Reports;

namespace StudentGradingSystem.Api.Interfaces;

public interface IReportRepository
{
    Task<List<int>> GetStudentIdsBySubjectAsync(int subjectId);

    Task<string> GetStudentNameAsync(int studentId);

    Task<List<Models.Attendance>> GetAttendanceAsync(
        int studentId, int subjectId);

    Task<decimal> GetMarkAsync(
        int studentId, int subjectId, string assessmentType);

    Task<decimal> GetAssignmentMarkAsync(int studentId, int subjectId);

    Task<bool> AnyAssignmentsBySubjectAsync(int subjectId);

    Task<List<FacultyReportDto>> GetFacultyReportsAsync();

    Task<List<DepartmentReportDto>> GetDepartmentReportsAsync();

    Task<List<AttendanceReportDto>> GetAttendanceReportsAsync();

    Task<List<MarksReportDto>> GetMarksReportsAsync();

    Task<List<SubjectReportDto>> GetSubjectReportsAsync();
}
