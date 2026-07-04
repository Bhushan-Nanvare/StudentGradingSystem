using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Interfaces;



public interface IStudentService
{
    List<Student> GetStudents();

    Task<Student?> GetStudentById(int id);

    Task AddStudent(Student student);

    Task<Student?> UpdateStudent(int id, Student dto);

    Task<bool> DeleteStudent(int id);
}