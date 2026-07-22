using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.DTOs.FacultyPortal;
using StudentGradingSystem.Api.DTOs.Subject;
using StudentGradingSystem.Api.Models;
using StudentGradingSystem.Api.DTOs.Common;
namespace StudentGradingSystem.Api.Interfaces;

public interface ISubjectRepository
{
    List<Subject> GetSubjects();

    Task<Subject?> GetSubjectById(int id);

    Task AddSubject(Subject subject);

    Task<Subject?> UpdateSubject(int id, Subject dto);

    Task<bool> DeleteSubject(int id);

    Task<Subject?> GetBySubjectCode(string subjectCode);

    Task<List<Subject>> GetSubjectsByFacultyIdAsync(int facultyId);

    Task<List<FacultyStudentDto>> GetStudentsBySubjectIdAsync(int subjectId);

    Task<List<StudentEnrolledDto>> GetEnrolledStudentsAsync(int subjectId);

    Task<List<StudentEnrolledDto>> GetAvailableStudentsAsync(int subjectId);

    Task EnrollStudentsAsync(int subjectId, List<int> studentIds);

    Task<bool> UnenrollStudentAsync(int subjectId, int studentId);

    Task<bool> AssignFacultyAsync(int subjectId, int facultyId);
}