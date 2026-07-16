using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.Interfaces;
using System.Security.Claims;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/teacher")]
[Authorize(Roles = "Faculty")]
public class TeacherController : ControllerBase
{
    private readonly ITeacherService _teacherService;

    public TeacherController(ITeacherService teacherService)
    {
        _teacherService = teacherService;
    }

    [HttpGet("subjects")]
    public async Task<IActionResult> GetMySubjects()
    {
        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var subjects =
            await _teacherService.GetMySubjects(userId);

        return Ok(subjects);
    }
}