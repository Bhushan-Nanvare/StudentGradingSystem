using StudentGradingSystem.Api.DTOs.Teacher;

namespace StudentGradingSystem.Api.Interfaces;

public interface ITeacherService
{
    Task<List<TeacherSubjectDto>> GetMySubjects(int userId);
}