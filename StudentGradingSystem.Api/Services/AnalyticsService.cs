using StudentGradingSystem.Api.DTOs.Analytics;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Services;

public class AnalyticsService : IAnalyticsService
{
    private readonly IAnalyticsRepository _analyticsRepository;

    public AnalyticsService(IAnalyticsRepository analyticsRepository)
    {
        _analyticsRepository = analyticsRepository;
    }

    public async Task<OverallAnalyticsDto> GetOverallAnalytics()
    {
        return await _analyticsRepository.GetOverallAnalyticsAsync();
    }

    public async Task<List<DepartmentAnalyticsDto>> GetDepartmentAnalytics()
    {
        return await _analyticsRepository.GetDepartmentAnalyticsAsync();
    }

    public async Task<List<SubjectAnalyticsDto>> GetSubjectAnalytics()
    {
        return await _analyticsRepository.GetSubjectAnalyticsAsync();
    }
}
