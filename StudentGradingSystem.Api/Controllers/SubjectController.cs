using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;
using Microsoft.AspNetCore.Authorization;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/subjects")]
[Authorize]
public class SubjectController : ControllerBase
{
    private readonly ISubjectService _subjectService;
    private readonly IMapper _mapper;

    public SubjectController(
        ISubjectService subjectService,
        IMapper mapper)
    {
        _subjectService = subjectService;
        _mapper = mapper;
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
        Subject subject = _mapper.Map<Subject>(dto);

        await _subjectService.AddSubject(subject);

        return CreatedAtAction(
            nameof(GetSubjectById),
            new { id = subject.Id },
            subject);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSubject(int id, Subject dto)
    {
        var subject = await _subjectService.UpdateSubject(id, dto);

        if (subject == null)
        {
            return NotFound();
        }

        return Ok(subject);
    }
    [Authorize(Roles = "Admin")]
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