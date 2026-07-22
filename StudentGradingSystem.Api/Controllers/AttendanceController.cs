using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.DTOs.Attendance;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/attendance")]
[Authorize(Roles = "Faculty")]
public class AttendanceController : ControllerBase
{
    private readonly IAttendanceService _attendanceService;

    public AttendanceController(
        IAttendanceService attendanceService)
    {
        _attendanceService = attendanceService;
    }

    [HttpPost]
    public async Task<IActionResult> MarkAttendance(
        MarkAttendanceDto dto)
    {
        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        await _attendanceService.MarkAttendance(userId, dto);

        return Ok();
    }

    [HttpGet("{subjectId}")]
    public async Task<IActionResult> GetAttendance(
        int subjectId,
        [FromQuery] DateOnly date)
    {
        var attendance =
            await _attendanceService.GetAttendance(subjectId, date);

        return Ok(attendance);
    }
}