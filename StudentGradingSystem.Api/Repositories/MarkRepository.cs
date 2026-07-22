using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.Marks;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Repositories;

public class MarkRepository : IMarkRepository
{
    private readonly AppDbContext _context;

    public MarkRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Mark?> GetExistingMarkAsync(
        int studentId, int subjectId, string assessmentType)
    {
        return await _context.Marks
            .FirstOrDefaultAsync(m =>
                m.StudentId == studentId &&
                m.SubjectId == subjectId &&
                m.AssessmentType == assessmentType);
    }

    public async Task AddMarkAsync(Mark mark)
    {
        _context.Marks.Add(mark);
    }

    public async Task<List<MarkResponseDto>> GetMarksBySubjectAsync(
        int subjectId, string assessmentType)
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

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
