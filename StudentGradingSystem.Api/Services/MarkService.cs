using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.Marks;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Services;

public class MarkService : IMarkService
{
    private readonly AppDbContext _context;

    public MarkService(AppDbContext context)
    {
        _context = context;
    }

    public async Task SaveMarks(
        int facultyUserId,
        SaveMarksDto dto)
    {
        var faculty = await _context.Faculties
            .FirstOrDefaultAsync(f =>
                f.ApplicationUserId == facultyUserId);

        if (faculty == null)
            return;

        foreach (var student in dto.Students)
        {
            var existing = await _context.Marks
                .FirstOrDefaultAsync(m =>
                    m.StudentId == student.StudentId &&
                    m.SubjectId == dto.SubjectId &&
                    m.AssessmentType == dto.AssessmentType);

            if (existing != null)
            {
                existing.MarksObtained = student.MarksObtained;
                existing.MaxMarks = dto.MaxMarks;
            }
            else
            {
                _context.Marks.Add(new Mark
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

        await _context.SaveChangesAsync();
    }

    public async Task<List<MarkResponseDto>> GetMarks(
        int subjectId,
        string assessmentType)
    {
        return await _context.StudentSubjects
            .Where(ss => ss.SubjectId == subjectId)
            .Select(ss => new MarkResponseDto
            {
                StudentId = ss.StudentId,
                StudentName = ss.Student.Name,

                AssessmentType = assessmentType,

                MarksObtained =
                    _context.Marks
                        .Where(m =>
                            m.StudentId == ss.StudentId &&
                            m.SubjectId == subjectId &&
                            m.AssessmentType == assessmentType)
                        .Select(m => m.MarksObtained)
                        .FirstOrDefault(),

                MaxMarks =
                    _context.Marks
                        .Where(m =>
                            m.StudentId == ss.StudentId &&
                            m.SubjectId == subjectId &&
                            m.AssessmentType == assessmentType)
                        .Select(m => m.MaxMarks)
                        .FirstOrDefault()
            })
            .ToListAsync();
    }
}