using StudentGradingSystem.Api.DTOs;
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
}