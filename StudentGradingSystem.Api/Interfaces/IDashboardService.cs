using StudentGradingSystem.Api.DTOs.Dashboard;

namespace StudentGradingSystem.Api.Interfaces;

public interface IDashboardService
{
    Task<DashboardStatsDto> GetDashboardStatistics();
}