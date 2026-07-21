using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.Common;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.DTOs.Common;
using StudentGradingSystem.Api.Filters;
using StudentGradingSystem.Api.Interfaces;

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

    [ServiceFilter(typeof(ValidationFilter<CreateStudentDto>))]
    [HttpPost]
    public async Task<IActionResult> AddStudent(CreateStudentDto dto)
    {
        await _studentService.AddStudent(dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Student created successfully.",
            Data = null,
            Errors = null
        });
    }

    [HttpGet]
    public async Task<IActionResult> GetStudents([FromQuery] StudentFilterDto filter)
    {
        var students = await _studentService.GetStudents(filter);

        return Ok(new ApiResponse<List<StudentResponseDto>>
        {
            Success = true,
            Message = "Students retrieved successfully.",
            Data = students
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
                Message = "Student not found."
            });
        }

        return Ok(new ApiResponse<StudentResponseDto>
        {
            Success = true,
            Message = "Student retrieved successfully.",
            Data = student
        });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateStudent(int id, UpdateStudentDto dto)
    {
        var student = _mapper.Map<StudentGradingSystem.Api.Models.Student>(dto);

        var updatedStudent = await _studentService.UpdateStudent(id, student);

        if (updatedStudent == null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Student not found."
            });
        }

        return Ok(new ApiResponse<StudentGradingSystem.Api.Models.Student>
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
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Student not found."
            });
        }

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Student deleted successfully."
        });
    }
}