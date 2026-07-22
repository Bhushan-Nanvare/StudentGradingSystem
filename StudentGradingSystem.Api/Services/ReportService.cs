using StudentGradingSystem.Api.DTOs.Reports;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Services;

public class ReportService : IReportService
{
    private readonly IReportRepository _reportRepository;

    public ReportService(IReportRepository reportRepository)
    {
        _reportRepository = reportRepository;
    }

    public async Task<List<StudentReportDto>> GetSubjectReport(int subjectId)
    {
        var studentIds = await _reportRepository
            .GetStudentIdsBySubjectAsync(subjectId);

        var report = new List<StudentReportDto>();

        foreach (var studentId in studentIds)
        {
            var studentName = await _reportRepository
                .GetStudentNameAsync(studentId);

            var attendance = await _reportRepository
                .GetAttendanceAsync(studentId, subjectId);

            decimal attendancePercentage = 0;

            if (attendance.Any())
            {
                attendancePercentage =
                    attendance.Count(a => a.IsPresent)
                    * 100m
                    / attendance.Count;
            }

            decimal cia1 = await _reportRepository
                .GetMarkAsync(studentId, subjectId, "CIA1");

            decimal cia2 = await _reportRepository
                .GetMarkAsync(studentId, subjectId, "CIA2");

            decimal assignment = await _reportRepository
                .GetAssignmentMarkAsync(studentId, subjectId);

            report.Add(new StudentReportDto
            {
                StudentId = studentId,
                StudentName = studentName,
                AttendancePercentage = Math.Round(attendancePercentage, 2),
                CIA1 = cia1,
                CIA2 = cia2,
                Assignment = assignment,
                Total = cia1 + cia2 + assignment
            });
        }

        return report;
    }

    public async Task<List<FacultyReportDto>> GetFacultyReports()
    {
        return await _reportRepository.GetFacultyReportsAsync();
    }

    public async Task<List<DepartmentReportDto>> GetDepartmentReports()
    {
        return await _reportRepository.GetDepartmentReportsAsync();
    }

    public async Task<List<AttendanceReportDto>> GetAttendanceReports()
    {
        return await _reportRepository.GetAttendanceReportsAsync();
    }

    public async Task<List<MarksReportDto>> GetMarksReports()
    {
        return await _reportRepository.GetMarksReportsAsync();
    }

    public async Task<List<SubjectReportDto>> GetSubjectReports()
    {
        return await _reportRepository.GetSubjectReportsAsync();
    }
}