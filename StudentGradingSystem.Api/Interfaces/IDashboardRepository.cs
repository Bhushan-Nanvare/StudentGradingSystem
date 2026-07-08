using StudentGradingSystem.Api.DTOs.Dashboard;

namespace StudentGradingSystem.Api.Interfaces;

public interface IDashboardRepository
{
    Task<DashboardStatsDto> GetDashboardStatistics();
}