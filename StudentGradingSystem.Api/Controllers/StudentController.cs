using Microsoft.AspNetCore.Mvc;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/students")]
public class StudentController : ControllerBase
{
    [HttpGet]
    public string GetStudents()
    {
        return "Hello from Student Controller";
    }
}