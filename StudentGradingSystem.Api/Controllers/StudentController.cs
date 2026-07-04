using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using StudentGradingSystem.Api.Common;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/students")]
public class StudentController : ControllerBase
{
    private readonly IStudentService _studentService;
    private readonly IMapper _mapper;

    public StudentController(
        IStudentService studentService,
        IMapper mapper)
    {
        _studentService = studentService;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> AddStudent(CreateStudentDto dto)
    {
        Student student = _mapper.Map<Student>(dto);

        await _studentService.AddStudent(student);

        return CreatedAtAction(
            nameof(GetStudentById),
            new { id = student.Id },
            student);
    }

    [HttpGet]
    public IActionResult GetStudents()
    {
        var students = _studentService.GetStudents();

        return Ok(students);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetStudentById(int id)
    {
        var student = await _studentService.GetStudentById(id);

        if (student == null)
        {
            return NotFound(new ApiResponse<Student>
            {
                Success = false,
                Message = "Student not found.",
                Data = null
            });
        }

        return Ok(new ApiResponse<Student>
        {
            Success = true,
            Message = "Student retrieved successfully.",
            Data = student
        });
    }

    [HttpPut("{id}")]
public async Task<IActionResult> UpdateStudent(int id, UpdateStudentDto dto)
{
    Student student = _mapper.Map<Student>(dto);

    var updatedStudent = await _studentService.UpdateStudent(id, student);

    if (updatedStudent == null)
    {
        return NotFound(new ApiResponse<Student>
        {
            Success = false,
            Message = "Student not found.",
            Data = null
        });
    }

    return Ok(new ApiResponse<Student>
    {
        Success = true,
        Message = "Student updated successfully.",
        Data = updatedStudent
    });
}

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStudent(int id)
    {
        var deleted = await _studentService.DeleteStudent(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}