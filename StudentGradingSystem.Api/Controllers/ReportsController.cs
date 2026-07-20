using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/reports")]
[Authorize(Roles = "Faculty")]
public class ReportsController : ControllerBase
{
    private readonly IReportService _service;

    public ReportsController(IReportService service)
    {
        _service = service;
    }

    [HttpGet("{subjectId}")]
    public async Task<IActionResult> GetReport(
        int subjectId)
    {
        return Ok(
            await _service.GetSubjectReport(subjectId));
    }
}