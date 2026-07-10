using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Models;
using StudentGradingSystem.Api.DTOs.Common;
namespace StudentGradingSystem.Api.Interfaces;




public interface IStudentService
{
    Task<List<StudentResponseDto>> GetStudents(StudentFilterDto filter);

    Task<StudentResponseDto?> GetStudentById(int id);

    Task AddStudent(Student student);

    Task<Student?> UpdateStudent(int id, Student dto);

    Task<bool> DeleteStudent(int id);
}