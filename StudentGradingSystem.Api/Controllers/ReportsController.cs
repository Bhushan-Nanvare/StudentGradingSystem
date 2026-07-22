using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/reports")]
[Authorize(Roles = "Admin,Faculty")]
public class ReportsController : ControllerBase
{
    private readonly IReportService _service;

    public ReportsController(IReportService service)
    {
        _service = service;
    }

    [HttpGet("student-subject/{subjectId}")]
    [HttpGet("{subjectId}")]
    public async Task<IActionResult> GetReport(int subjectId)
    {
        return Ok(await _service.GetSubjectReport(subjectId));
    }

    [HttpGet("faculty")]
    public async Task<IActionResult> GetFacultyReports()
    {
        return Ok(await _service.GetFacultyReports());
    }

    [HttpGet("department")]
    public async Task<IActionResult> GetDepartmentReports()
    {
        return Ok(await _service.GetDepartmentReports());
    }

    [HttpGet("attendance")]
    public async Task<IActionResult> GetAttendanceReports()
    {
        return Ok(await _service.GetAttendanceReports());
    }

    [HttpGet("marks")]
    public async Task<IActionResult> GetMarksReports()
    {
        return Ok(await _service.GetMarksReports());
    }

    [HttpGet("subject")]
    public async Task<IActionResult> GetSubjectReports()
    {
        return Ok(await _service.GetSubjectReports());
    }
}