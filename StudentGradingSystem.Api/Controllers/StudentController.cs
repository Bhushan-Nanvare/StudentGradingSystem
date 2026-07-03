using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Models;
using StudentGradingSystem.Api.Services;
using StudentGradingSystem.Api.Interfaces;
namespace StudentGradingSystem.Api.Controllers;


[ApiController]
[Route("api/students")]
public class StudentController : ControllerBase
{
   private readonly IStudentService _studentService;

public StudentController(IStudentService studentService)
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

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateStudent(int id, UpdateStudentDto dto)
    {
        var student = await _studentService.UpdateStudent(id, dto);

        if (student == null)
        {
            return NotFound();
        }

        return Ok(student);
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