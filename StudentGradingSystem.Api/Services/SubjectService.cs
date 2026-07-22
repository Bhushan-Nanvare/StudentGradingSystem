using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.DTOs.Subject;
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

    public async Task<List<StudentEnrolledDto>> GetEnrolledStudentsAsync(int subjectId)
    {
        return await _subjectRepository.GetEnrolledStudentsAsync(subjectId);
    }

    public async Task<List<StudentEnrolledDto>> GetAvailableStudentsAsync(int subjectId)
    {
        return await _subjectRepository.GetAvailableStudentsAsync(subjectId);
    }

    public async Task EnrollStudentsAsync(int subjectId, List<int> studentIds)
    {
        await _subjectRepository.EnrollStudentsAsync(subjectId, studentIds);
    }

    public async Task<bool> UnenrollStudentAsync(int subjectId, int studentId)
    {
        return await _subjectRepository.UnenrollStudentAsync(subjectId, studentId);
    }

    public async Task<bool> AssignFacultyAsync(int subjectId, int facultyId)
    {
        return await _subjectRepository.AssignFacultyAsync(subjectId, facultyId);
    }
}