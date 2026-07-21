using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.DTOs.Common;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Interfaces;

public interface IStudentService
{
    Task<List<StudentResponseDto>> GetStudents(StudentFilterDto filter);

    Task<StudentResponseDto?> GetStudentById(int id);

    Task AddStudent(CreateStudentDto dto);

    Task<Student?> UpdateStudent(int id, Student dto);

    Task<bool> DeleteStudent(int id);
}