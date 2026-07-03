using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/subjects")]
public class SubjectController : ControllerBase
{
    private readonly ISubjectService _subjectService;

    public SubjectController(ISubjectService subjectService)
    {
        _subjectService = subjectService;
    }

    [HttpGet]
    public IActionResult GetSubjects()
    {
        var subjects = _subjectService.GetSubjects();

        return Ok(subjects);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSubjectById(int id)
    {
        var subject = await _subjectService.GetSubjectById(id);

        if (subject == null)
        {
            return NotFound();
        }

        return Ok(subject);
    }

    [HttpPost]
    public async Task<IActionResult> AddSubject(CreateSubjectDto dto)
    {
        Subject subject = new Subject
        {
            SubjectCode = dto.SubjectCode,
            Name = dto.Name,
            Credits = dto.Credits,
            Semester = dto.Semester
        };

        await _subjectService.AddSubject(subject);

        return CreatedAtAction(
            nameof(GetSubjectById),
            new { id = subject.Id },
            subject
        );
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSubject(int id, UpdateSubjectDto dto)
    {
        var subject = await _subjectService.UpdateSubject(id, dto);

        if (subject == null)
        {
            return NotFound();
        }

        return Ok(subject);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSubject(int id)
    {
        bool deleted = await _subjectService.DeleteSubject(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}