using StudentGradingSystem.Api.DTOs.Analytics;

namespace StudentGradingSystem.Api.Interfaces;

public interface IAnalyticsService
{
    Task<OverallAnalyticsDto> GetOverallAnalytics();

    Task<List<DepartmentAnalyticsDto>> GetDepartmentAnalytics();

    Task<List<SubjectAnalyticsDto>> GetSubjectAnalytics();
}
