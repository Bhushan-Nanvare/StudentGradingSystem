using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Authorize(Roles = "Student")]
[Route("api/student-portal")]
public class StudentPortalController : ControllerBase
{
    private readonly IStudentPortalService _service;

    public StudentPortalController(
        IStudentPortalService service)
    {
        _service = service;
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> Dashboard()
    {
        int userId = int.Parse(
            User.FindFirst(JwtRegisteredClaimNames.Sub)!.Value);

        return Ok(await _service.GetDashboard(userId));
    }

    [HttpGet("profile")]
    public async Task<IActionResult> Profile()
    {
        int userId = int.Parse(
            User.FindFirst(JwtRegisteredClaimNames.Sub)!.Value);

        return Ok(await _service.GetProfile(userId));
    }

    [HttpGet("subjects")]
    public async Task<IActionResult> Subjects()
    {
        int userId = int.Parse(
            User.FindFirst(JwtRegisteredClaimNames.Sub)!.Value);

        return Ok(await _service.GetSubjects(userId));
    }

    [HttpGet("attendance")]
    public async Task<IActionResult> Attendance()
    {
        int userId = int.Parse(
            User.FindFirst(JwtRegisteredClaimNames.Sub)!.Value);

        return Ok(await _service.GetAttendance(userId));
    }

    [HttpGet("marks")]
    public async Task<IActionResult> Marks()
    {
        int userId = int.Parse(
            User.FindFirst(JwtRegisteredClaimNames.Sub)!.Value);

        return Ok(await _service.GetMarks(userId));
    }

    [HttpGet("assignments")]
    public async Task<IActionResult> Assignments()
    {
        int userId = int.Parse(
            User.FindFirst(JwtRegisteredClaimNames.Sub)!.Value);

        return Ok(await _service.GetAssignments(userId));
    }
}