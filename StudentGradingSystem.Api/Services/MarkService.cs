using StudentGradingSystem.Api.DTOs.Marks;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Services;

public class MarkService : IMarkService
{
    private readonly IMarkRepository _markRepository;
    private readonly IFacultyRepository _facultyRepository;

    public MarkService(
        IMarkRepository markRepository,
        IFacultyRepository facultyRepository)
    {
        _markRepository = markRepository;
        _facultyRepository = facultyRepository;
    }

    public async Task SaveMarks(
        int facultyUserId,
        SaveMarksDto dto)
    {
        var faculty = await _facultyRepository
            .GetFacultyByApplicationUserIdAsync(facultyUserId);

        if (faculty == null)
            return;

        foreach (var student in dto.Students)
        {
            var existing = await _markRepository.GetExistingMarkAsync(
                student.StudentId, dto.SubjectId, dto.AssessmentType);

            if (existing != null)
            {
                existing.MarksObtained = student.MarksObtained;
                existing.MaxMarks = dto.MaxMarks;
            }
            else
            {
                await _markRepository.AddMarkAsync(new Mark
                {
                    StudentId = student.StudentId,
                    SubjectId = dto.SubjectId,
                    FacultyId = faculty.Id,
                    AssessmentType = dto.AssessmentType,
                    MarksObtained = student.MarksObtained,
                    MaxMarks = dto.MaxMarks
                });
            }
        }

        await _markRepository.SaveChangesAsync();
    }

    public async Task<List<MarkResponseDto>> GetMarks(
        int subjectId,
        string assessmentType)
    {
        return await _markRepository
            .GetMarksBySubjectAsync(subjectId, assessmentType);
    }
}