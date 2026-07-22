using StudentGradingSystem.Api.DTOs.Analytics;

namespace StudentGradingSystem.Api.Interfaces;

public interface IAnalyticsRepository
{
    Task<OverallAnalyticsDto> GetOverallAnalyticsAsync();

    Task<List<DepartmentAnalyticsDto>> GetDepartmentAnalyticsAsync();

    Task<List<SubjectAnalyticsDto>> GetSubjectAnalyticsAsync();
}
