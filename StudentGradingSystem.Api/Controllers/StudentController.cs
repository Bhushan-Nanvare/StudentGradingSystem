using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.Models;
using StudentGradingSystem.Api.Services;
using StudentGradingSystem.Api.DTOs;

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
public IActionResult AddStudent(CreateStudentDto dto)
{
    Student student = new Student
    {
        Name = dto.Name,
        Age = dto.Age,
        Department = dto.Department,
        CGPA = dto.CGPA
    };

    _studentService.AddStudent(student);

    return Ok(student);
}

    [HttpGet]
    public IActionResult GetStudents()
    {
        var students = _studentService.GetStudents();

        return Ok(students);
    }
}