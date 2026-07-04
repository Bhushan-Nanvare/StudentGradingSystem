using Microsoft.Extensions.Logging;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Services;

public class StudentService : IStudentService
{
    private readonly IStudentRepository _studentRepository;
    private readonly ILogger<StudentService> _logger;

    public StudentService(
        IStudentRepository studentRepository,
        ILogger<StudentService> logger)
    {
        _studentRepository = studentRepository;
        _logger = logger;
    }

    public List<Student> GetStudents()
    {
        return _studentRepository.GetStudents();
    }

    public async Task<Student?> GetStudentById(int id)
    {
        return await _studentRepository.GetStudentById(id);
    }

    public async Task AddStudent(Student student)
    {
        _logger.LogInformation(
            "Adding new student: {StudentName}",
            student.Name);

        await _studentRepository.AddStudent(student);

        _logger.LogInformation(
            "Student added successfully with Id: {StudentId}",
            student.Id);
    }

public async Task<Student?> UpdateStudent(int id, UpdateStudentDto dto)
{
    _logger.LogInformation(
        "Updating student with Id: {StudentId}",
        id);

    var student = await _studentRepository.UpdateStudent(id, dto);

    if (student == null)
    {
        _logger.LogWarning(
            "Student not found for update. Id: {StudentId}",
            id);

        return null;
    }

    _logger.LogInformation(
        "Student updated successfully. Id: {StudentId}",
        id);

    return student;
}

public async Task<bool> DeleteStudent(int id)
{
    _logger.LogInformation(
        "Deleting student with Id: {StudentId}",
        id);

    bool deleted = await _studentRepository.DeleteStudent(id);

    if (!deleted)
    {
        _logger.LogWarning(
            "Student not found for deletion. Id: {StudentId}",
            id);

        return false;
    }

    _logger.LogInformation(
        "Student deleted successfully. Id: {StudentId}",
        id);

    return true;
}
}