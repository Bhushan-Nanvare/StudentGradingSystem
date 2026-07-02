using Microsoft.AspNetCore.Mvc;
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
    public IActionResult AddStudent(Student student)
    {
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