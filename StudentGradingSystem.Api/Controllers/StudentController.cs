using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using StudentGradingSystem.Api.Common;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.DTOs.Common;
using StudentGradingSystem.Api.Filters;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;
using Microsoft.AspNetCore.Authorization;
namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/students")]
//[Authorize]
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

    [ServiceFilter(typeof(ValidationFilter<CreateStudentDto>))]
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
    public async Task<IActionResult> GetStudents([FromQuery] StudentFilterDto filter)
    {
        var students = await _studentService.GetStudents(filter);

        return Ok(new ApiResponse<List<StudentResponseDto>>
        {
            Success = true,
            Message = "Students retrieved successfully.",
            Data = students,
            Errors = null
        });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetStudentById(int id)
    {
        var student = await _studentService.GetStudentById(id);

        if (student == null)
        {
            return NotFound(new ApiResponse<StudentResponseDto>
            {
                Success = false,
                Message = "Student not found.",
                Data = null,
                Errors = null
            });
        }

        return Ok(new ApiResponse<StudentResponseDto>
        {
            Success = true,
            Message = "Student retrieved successfully.",
            Data = student,
            Errors = null
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
                Data = null,
                Errors = null
            });
        }

        return Ok(new ApiResponse<Student>
        {
            Success = true,
            Message = "Student updated successfully.",
            Data = updatedStudent,
            Errors = null
        });
    }
    //[Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStudent(int id)
    {
        var deleted = await _studentService.DeleteStudent(id);

        if (!deleted)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Student not found.",
                Data = null,
                Errors = null
            });
        }

            return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Student deleted successfully.",
            Data = null,
            Errors = null
        });
    }
}