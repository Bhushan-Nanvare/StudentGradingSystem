using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using StudentGradingSystem.Api.DTOs.Marks;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/marks")]
[Authorize(Roles = "Faculty")]
public class MarksController : ControllerBase
{
    private readonly IMarkService _service;

    public MarksController(IMarkService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> SaveMarks(
        SaveMarksDto dto)
    {
        var userId = int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        await _service.SaveMarks(userId, dto);

        return Ok();
    }

    [HttpGet("{subjectId}")]
    public async Task<IActionResult> GetMarks(
        int subjectId,
        [FromQuery] string assessmentType)
    {
        return Ok(await _service.GetMarks(
            subjectId,
            assessmentType));
    }
}