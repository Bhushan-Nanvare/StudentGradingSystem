using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.Common;
using StudentGradingSystem.Api.DTOs.Dashboard;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet]
    public async Task<IActionResult> GetDashboardStatistics()
    {
        var dashboardStats = await _dashboardService.GetDashboardStatistics();

        return Ok(new ApiResponse<DashboardStatsDto>
        {
            Success = true,
            Message = "Dashboard statistics retrieved successfully.",
            Data = dashboardStats
        });
    }
}