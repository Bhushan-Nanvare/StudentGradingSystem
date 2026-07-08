using StudentGradingSystem.Api.DTOs.Dashboard;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Services;

public class DashboardService : IDashboardService
{
    private readonly IDashboardRepository _dashboardRepository;

    public DashboardService(IDashboardRepository dashboardRepository)
    {
        _dashboardRepository = dashboardRepository;
    }

    public async Task<DashboardStatsDto> GetDashboardStatistics()
    {
        return await _dashboardRepository.GetDashboardStatistics();
    }
}