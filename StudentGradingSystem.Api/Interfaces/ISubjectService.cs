using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Interfaces;

public interface ISubjectService
{
    List<Subject> GetSubjects();

    Task<Subject?> GetSubjectById(int id);

    Task AddSubject(Subject subject);

    Task<Subject?> UpdateSubject(int id, UpdateSubjectDto dto);

    Task<bool> DeleteSubject(int id);
}