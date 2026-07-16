using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.Teacher;
using StudentGradingSystem.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace StudentGradingSystem.Api.Services;

public class TeacherService : ITeacherService
{
    private readonly AppDbContext _context;

    public TeacherService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<TeacherSubjectDto>> GetMySubjects(int userId)
    {
        var faculty = await _context.Faculties
            .FirstOrDefaultAsync(f =>
                f.ApplicationUserId == userId);

        if (faculty == null)
        {
            return new List<TeacherSubjectDto>();
        }

        return await _context.Subjects
            .Where(s => s.FacultyId == faculty.Id)
            .Select(s => new TeacherSubjectDto
            {
                Id = s.Id,
                SubjectCode = s.SubjectCode,
                Name = s.Name,
                Credits = s.Credits,
                Semester = s.Semester,
                DepartmentName = s.Department.Name
            })
            .ToListAsync();
    }
}