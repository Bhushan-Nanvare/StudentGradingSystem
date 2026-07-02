using StudentGradingSystem.Api.Models;
using StudentGradingSystem.Api.Repositories;

namespace StudentGradingSystem.Api.Services;

public class StudentService
{
    private readonly StudentRepository _studentRepository;

    public StudentService(StudentRepository studentRepository)
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
}