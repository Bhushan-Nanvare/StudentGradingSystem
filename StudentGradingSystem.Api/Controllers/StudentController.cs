using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Models;
using StudentGradingSystem.Api.Services;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/students")]
public class StudentController : ControllerBase
{
    private readonly StudentService _studentService;

    public StudentController(StudentService studentService)
    {
        _studentService = studentService;
    }

    [HttpPost]
    public async Task<IActionResult> AddStudent(CreateStudentDto dto)
    {
        Student student = new Student
        {
            Name = dto.Name,
            Age = dto.Age,
            Department = dto.Department,
            CGPA = dto.CGPA
        };

        await _studentService.AddStudent(student);

        return CreatedAtAction(
            nameof(GetStudentById),
            new { id = student.Id },
            student
        );
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
            return NotFound();
        }

        return Ok(student);
    }
}