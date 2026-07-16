using StudentGradingSystem.Api.DTOs.Teacher;

namespace StudentGradingSystem.Api.Interfaces;

public interface ITeacherService
{
    Task<List<TeacherSubjectDto>> GetMySubjects(int userId);

    Task<List<TeacherStudentDto>> GetStudentsBySubject(int subjectId);
}