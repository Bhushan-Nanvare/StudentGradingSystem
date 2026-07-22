using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.Interfaces;
using System.Security.Claims;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/faculty-portal")]
[Authorize(Roles = "Faculty")]
public class FacultyPortalController : ControllerBase
{
    private readonly IFacultyPortalService _facultyPortalService;

    public FacultyPortalController(IFacultyPortalService facultyPortalService)
    {
        _facultyPortalService = facultyPortalService;
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboard()
    {
        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var stats = await _facultyPortalService.GetDashboard(userId);
        return Ok(stats);
    }

    [HttpGet("subjects")]
    public async Task<IActionResult> GetMySubjects()
    {
        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var subjects =
            await _facultyPortalService.GetMySubjects(userId);

        return Ok(subjects);
    }

    [HttpGet("subjects/{subjectId}/students")]
    public async Task<IActionResult> GetStudentsBySubject(int subjectId)
    {
        var students =
            await _facultyPortalService.GetStudentsBySubject(subjectId);

        return Ok(students);
    }

    [HttpGet("attendance/{subjectId}")]
    public async Task<IActionResult> GetAttendanceBySubject(
        int subjectId,
        [FromQuery] DateOnly date)
    {
        var attendance = await _facultyPortalService.GetAttendanceBySubject(subjectId, date);
        return Ok(attendance);
    }

    [HttpGet("marks/{subjectId}")]
    public async Task<IActionResult> GetMarksBySubject(
        int subjectId,
        [FromQuery] string assessmentType)
    {
        var marks = await _facultyPortalService.GetMarksBySubject(subjectId, assessmentType);
        return Ok(marks);
    }

    [HttpGet("assignments/{subjectId}")]
    public async Task<IActionResult> GetAssignmentsBySubject(int subjectId)
    {
        var assignments = await _facultyPortalService.GetAssignmentsBySubject(subjectId);
        return Ok(assignments);
    }

    [HttpGet("submissions/{assignmentId}")]
    public async Task<IActionResult> GetSubmissionsByAssignment(int assignmentId)
    {
        var submissions = await _facultyPortalService.GetSubmissionsByAssignment(assignmentId);
        return Ok(submissions);
    }
}
