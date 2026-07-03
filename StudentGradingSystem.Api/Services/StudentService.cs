using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Models;
using StudentGradingSystem.Api.Repositories;
using StudentGradingSystem.Api.Interfaces;
namespace StudentGradingSystem.Api.Services;

public class StudentService : IStudentService
{
    private readonly IStudentRepository _studentRepository;

    public StudentService(IStudentRepository studentRepository)
    {
        _studentRepository = studentRepository;
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
        await _studentRepository.AddStudent(student);
    }
    public async Task<Student?> UpdateStudent(int id, UpdateStudentDto dto)
{
    return await _studentRepository.UpdateStudent(id, dto);
}

    public async Task<bool> DeleteStudent(int id)
{
    return await _studentRepository.DeleteStudent(id);
}
}