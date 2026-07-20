using StudentGradingSystem.Api.DTOs.Reports;

namespace StudentGradingSystem.Api.Interfaces;

public interface IReportService
{
    Task<List<StudentReportDto>> GetSubjectReport(int subjectId);
}