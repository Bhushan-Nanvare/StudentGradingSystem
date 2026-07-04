using StudentGradingSystem.Api.DTOs.Common;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Interfaces;

public interface IStudentRepository
{
    Task<List<Student>> GetStudents(StudentFilterDto filter);

    Task<Student?> GetStudentById(int id);

    Task AddStudent(Student student);

    Task<Student?> UpdateStudent(int id, Student updatedStudent);

    Task<bool> DeleteStudent(int id);
}

