using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.DTOs.Subject;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;
using Microsoft.AspNetCore.Authorization;
using StudentGradingSystem.Api.Common;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/subjects")]
[Authorize(Roles = "Admin")]
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
        var subjects =
            _subjectService.GetSubjects();

        var response =
            _mapper.Map<List<SubjectResponseDto>>(subjects);

        return Ok(new ApiResponse<List<SubjectResponseDto>>
        {
            Success = true,
            Message = "Subjects retrieved successfully.",
            Data = response
        });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSubjectById(int id)
    {
        var subject = await _subjectService.GetSubjectById(id);

        if (subject == null)
        {
            return NotFound();
        }

        var response = _mapper.Map<SubjectResponseDto>(subject);

        return Ok(new ApiResponse<SubjectResponseDto>
        {
            Success = true,
            Message = "Subject retrieved successfully.",
            Data = response
        });
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
    public async Task<IActionResult> UpdateSubject(
        int id,
        UpdateSubjectDto dto)
    {
        var subject = _mapper.Map<Subject>(dto);

        var updatedSubject =
            await _subjectService.UpdateSubject(id, subject);

        if (updatedSubject == null)
        {
            return NotFound();
        }

        return Ok(updatedSubject);
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

    // Task 3 – Subject Allocation

    [HttpGet("{subjectId}/students")]
    public async Task<IActionResult> GetEnrolledStudents(int subjectId)
    {
        var students = await _subjectService.GetEnrolledStudentsAsync(subjectId);

        return Ok(new ApiResponse<List<StudentEnrolledDto>>
        {
            Success = true,
            Message = "Enrolled students retrieved.",
            Data = students
        });
    }

    [HttpGet("{subjectId}/available-students")]
    public async Task<IActionResult> GetAvailableStudents(int subjectId)
    {
        var students = await _subjectService.GetAvailableStudentsAsync(subjectId);

        return Ok(new ApiResponse<List<StudentEnrolledDto>>
        {
            Success = true,
            Message = "Available students retrieved.",
            Data = students
        });
    }

    [HttpPost("{subjectId}/students")]
    public async Task<IActionResult> EnrollStudents(
        int subjectId,
        EnrollStudentsDto dto)
    {
        if (dto.StudentIds == null || dto.StudentIds.Count == 0)
            return BadRequest("At least one studentId is required.");

        await _subjectService.EnrollStudentsAsync(subjectId, dto.StudentIds);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Students enrolled successfully."
        });
    }

    [HttpDelete("{subjectId}/students/{studentId}")]
    public async Task<IActionResult> UnenrollStudent(
        int subjectId,
        int studentId)
    {
        var removed = await _subjectService.UnenrollStudentAsync(subjectId, studentId);

        if (!removed)
            return NotFound("Enrollment not found.");

        return NoContent();
    }

    // Task 4 – Faculty Allocation

    [HttpPut("{subjectId}/faculty")]
    public async Task<IActionResult> AssignFaculty(
        int subjectId,
        AssignFacultyDto dto)
    {
        var assigned = await _subjectService.AssignFacultyAsync(subjectId, dto.FacultyId);

        if (!assigned)
            return NotFound("Subject not found.");

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Faculty assigned successfully."
        });
    }
}