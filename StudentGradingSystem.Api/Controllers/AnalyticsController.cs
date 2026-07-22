using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/analytics")]
[Authorize(Roles = "Admin,Faculty")]
public class AnalyticsController : ControllerBase
{
    private readonly IAnalyticsService _analyticsService;

    public AnalyticsController(IAnalyticsService analyticsService)
    {
        _analyticsService = analyticsService;
    }

    [HttpGet("overall")]
    public async Task<IActionResult> GetOverallAnalytics()
    {
        var data = await _analyticsService.GetOverallAnalytics();
        return Ok(data);
    }

    [HttpGet("departments")]
    public async Task<IActionResult> GetDepartmentAnalytics()
    {
        var data = await _analyticsService.GetDepartmentAnalytics();
        return Ok(data);
    }

    [HttpGet("subjects")]
    public async Task<IActionResult> GetSubjectAnalytics()
    {
        var data = await _analyticsService.GetSubjectAnalytics();
        return Ok(data);
    }
}
