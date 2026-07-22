using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/cgpa")]
[Authorize]
public class CgpaController : ControllerBase
{
    private readonly ICgpaService _cgpaService;

    public CgpaController(ICgpaService cgpaService)
    {
        _cgpaService = cgpaService;
    }

    [HttpGet("student/{studentId}")]
    public async Task<IActionResult> GetStudentCgpa(int studentId)
    {
        var summary = await _cgpaService.GetStudentCgpa(studentId);
        if (summary == null)
            return NotFound("Student not found.");

        return Ok(summary);
    }

    [HttpPost("student/{studentId}/recalculate")]
    [Authorize(Roles = "Admin,Faculty")]
    public async Task<IActionResult> RecalculateStudentCgpa(int studentId)
    {
        var summary = await _cgpaService.RecalculateAndSaveStudentCgpa(studentId);
        if (summary == null)
            return NotFound("Student not found.");

        return Ok(summary);
    }
}
