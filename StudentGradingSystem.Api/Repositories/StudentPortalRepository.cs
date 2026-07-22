using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.StudentPortal;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Repositories;

public class StudentPortalRepository : IStudentPortalRepository
{
    private readonly AppDbContext _context;

    public StudentPortalRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Student?> GetStudentWithDetailsAsync(
        int applicationUserId)
    {
        return await _context.Students
            .Include(x => x.Department)
            .Include(x => x.StudentSubjects)
            .Include(x => x.ApplicationUser)
            .FirstOrDefaultAsync(x =>
                x.ApplicationUserId == applicationUserId);
    }

    public async Task<Student?> GetStudentByApplicationUserIdAsync(
        int applicationUserId)
    {
        return await _context.Students
            .Include(x => x.Department)
            .Include(x => x.ApplicationUser)
            .FirstOrDefaultAsync(x =>
                x.ApplicationUserId == applicationUserId);
    }

    public async Task<List<StudentSubjectDto>> GetSubjectsAsync(
        int studentId)
    {
        return await _context.StudentSubjects
            .Where(x => x.StudentId == studentId)
            .Select(x => new StudentSubjectDto
            {
                Id = x.Subject.Id,
                SubjectCode = x.Subject.SubjectCode,
                SubjectName = x.Subject.Name,
                Credits = x.Subject.Credits,
                Semester = x.Subject.Semester,
                Faculty = x.Subject.Faculty.FirstName + " " +
                    x.Subject.Faculty.LastName
            })
            .ToListAsync();
    }

    public async Task<List<StudentAttendanceDto>> GetAttendanceAsync(
        int studentId)
    {
        return await _context.Attendances
            .Where(x => x.StudentId == studentId)
            .GroupBy(x => x.Subject.Name)
            .Select(g => new StudentAttendanceDto
            {
                Subject = g.Key,
                TotalClasses = g.Count(),
                PresentClasses = g.Count(x => x.IsPresent),
                Percentage = g.Count() == 0
                    ? 0
                    : g.Count(x => x.IsPresent) * 100.0 / g.Count()
            })
            .ToListAsync();
    }

    public async Task<List<StudentMarkDto>> GetMarksAsync(int studentId)
    {
        return await _context.Marks
            .Where(x => x.StudentId == studentId)
            .Select(x => new StudentMarkDto
            {
                Subject = x.Subject.Name,
                AssessmentType = x.AssessmentType,
                MarksObtained = x.MarksObtained,
                MaxMarks = x.MaxMarks,
                Percentage = x.MaxMarks == 0
                    ? 0m
                    : (x.MarksObtained * 100m) / x.MaxMarks
            })
            .ToListAsync();
    }

    public async Task<int> GetPendingAssignmentsCountAsync(int studentId)
    {
        return await _context.Assignments.CountAsync(a =>
            !_context.AssignmentSubmissions.Any(s =>
                s.AssignmentId == a.Id &&
                s.StudentId == studentId));
    }

    public async Task<List<Attendance>> GetAllAttendanceForStudentAsync(
        int studentId)
    {
        return await _context.Attendances
            .Where(x => x.StudentId == studentId)
            .ToListAsync();
    }

    public async Task<List<StudentAssignmentDto>> GetAssignmentsAsync(
        int studentId)
    {
        var enrolledSubjectIds = await _context.StudentSubjects
            .Where(ss => ss.StudentId == studentId)
            .Select(ss => ss.SubjectId)
            .ToListAsync();

        return await _context.Assignments
            .Where(a => enrolledSubjectIds.Contains(a.SubjectId))
            .Select(a => new StudentAssignmentDto
            {
                AssignmentId = a.Id,
                Title = a.Title,
                Description = a.Description,
                Subject = a.Subject.Name,
                DueDate = a.DueDate,
                MaxMarks = a.MaxMarks,

                Submitted = _context.AssignmentSubmissions.Any(s =>
                    s.AssignmentId == a.Id &&
                    s.StudentId == studentId),

                MarksObtained = _context.AssignmentSubmissions
                    .Where(s =>
                        s.AssignmentId == a.Id &&
                        s.StudentId == studentId)
                    .Select(s => s.Marks)
                    .FirstOrDefault()
            })
            .ToListAsync();
    }
}
