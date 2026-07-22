using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.DTOs.Subject;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Interfaces;

public interface ISubjectService
{
    List<Subject> GetSubjects();

    Task<Subject?> GetSubjectById(int id);

    Task AddSubject(Subject subject);

    Task<Subject?> UpdateSubject(int id, Subject dto);

    Task<bool> DeleteSubject(int id);

    Task<List<StudentEnrolledDto>> GetEnrolledStudentsAsync(int subjectId);

    Task<List<StudentEnrolledDto>> GetAvailableStudentsAsync(int subjectId);

    Task EnrollStudentsAsync(int subjectId, List<int> studentIds);

    Task<bool> UnenrollStudentAsync(int subjectId, int studentId);

    Task<bool> AssignFacultyAsync(int subjectId, int facultyId);
}