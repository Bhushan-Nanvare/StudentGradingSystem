using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.DTOs.AssignmentSubmission;
using StudentGradingSystem.Api.Services.Interfaces;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AssignmentSubmissionsController : ControllerBase
{
    private readonly IAssignmentSubmissionService _service;

    public AssignmentSubmissionsController(
        IAssignmentSubmissionService service)
    {
        _service = service;
    }

    [Authorize(Roles = "Student")]
    [HttpPost]
    public async Task<IActionResult> Submit(
        [FromForm] CreateAssignmentSubmissionDto dto)
    {
        await _service.SubmitAsync(dto);

        return Ok();
    }

    [Authorize(Roles = "Faculty")]
    [HttpGet("{assignmentId}")]
    public async Task<IActionResult> Get(int assignmentId)
    {
        return Ok(await _service.GetByAssignmentAsync(assignmentId));
    }

    [Authorize(Roles = "Faculty")]
    [HttpPut("{submissionId}")]
    public async Task<IActionResult> UpdateMarks(
        int submissionId,
        UpdateSubmissionMarksDto dto)
    {
        await _service.UpdateMarksAsync(
            submissionId,
            dto);

        return NoContent();
    }
}