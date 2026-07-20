using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.DTOs.Assignment;
using StudentGradingSystem.Api.Services.Interfaces;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Faculty")]
public class AssignmentsController : ControllerBase
{
    private readonly IAssignmentService _assignmentService;

    public AssignmentsController(IAssignmentService assignmentService)
    {
        _assignmentService = assignmentService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateAssignment(
        CreateAssignmentDto dto)
    {
        var userId = int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        await _assignmentService.CreateAssignment(userId, dto);

        return Ok(new
        {
            message = "Assignment created successfully."
        });
    }

    [HttpGet("subject/{subjectId}")]
    public async Task<IActionResult> GetAssignments(
        int subjectId)
    {
        var assignments =
            await _assignmentService.GetAssignments(subjectId);

        return Ok(assignments);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAssignment(
        int id,
        UpdateAssignmentDto dto)
    {
        var userId = int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        await _assignmentService.UpdateAssignment(
            id,
            userId,
            dto);

        return Ok(new
        {
            message = "Assignment updated successfully."
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAssignment(
        int id)
    {
        var userId = int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        await _assignmentService.DeleteAssignment(
            id,
            userId);

        return Ok(new
        {
            message = "Assignment deleted successfully."
        });
    }
}