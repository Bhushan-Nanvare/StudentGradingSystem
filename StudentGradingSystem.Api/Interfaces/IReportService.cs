using StudentGradingSystem.Api.DTOs.Reports;

namespace StudentGradingSystem.Api.Interfaces;

public interface IReportService
{
    Task<List<StudentReportDto>> GetSubjectReport(int subjectId);

    Task<List<FacultyReportDto>> GetFacultyReports();

    Task<List<DepartmentReportDto>> GetDepartmentReports();

    Task<List<AttendanceReportDto>> GetAttendanceReports();

    Task<List<MarksReportDto>> GetMarksReports();

    Task<List<SubjectReportDto>> GetSubjectReports();
}