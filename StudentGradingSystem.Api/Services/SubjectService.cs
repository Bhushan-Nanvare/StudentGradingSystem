using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;
using StudentGradingSystem.Api.Exceptions;

namespace StudentGradingSystem.Api.Services;

public class SubjectService : ISubjectService
{
    private readonly ISubjectRepository _subjectRepository;

    public SubjectService(ISubjectRepository subjectRepository)
    {
        _subjectRepository = subjectRepository;
    }

    public List<Subject> GetSubjects()
    {
        return _subjectRepository.GetSubjects();
    }

    public async Task<Subject?> GetSubjectById(int id)
    {
        return await _subjectRepository.GetSubjectById(id);
    }

public async Task AddSubject(Subject subject)
{
    var existingSubject = await _subjectRepository.GetBySubjectCode(subject.SubjectCode);

    if (existingSubject != null)
    {
        throw new DuplicateSubjectCodeException(subject.SubjectCode);;
    }

    await _subjectRepository.AddSubject(subject);
}

    public async Task<Subject?> UpdateSubject(int id, Subject dto)
    {
        return await _subjectRepository.UpdateSubject(id, dto);
    }

    public async Task<bool> DeleteSubject(int id)
    {
        return await _subjectRepository.DeleteSubject(id);
    }
}