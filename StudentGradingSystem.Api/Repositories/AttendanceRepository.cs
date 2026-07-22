using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.Attendance;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Repositories;

public class AttendanceRepository : IAttendanceRepository
{
    private readonly AppDbContext _context;

    public AttendanceRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Attendance?> GetExistingAttendanceAsync(
        int studentId, int subjectId, DateOnly date)
    {
        return await _context.Attendances
            .FirstOrDefaultAsync(a =>
                a.StudentId == studentId &&
                a.SubjectId == subjectId &&
                a.Date == date);
    }

    public async Task AddAttendanceAsync(Attendance attendance)
    {
        _context.Attendances.Add(attendance);
    }

    public async Task<List<AttendanceResponseDto>> GetAttendanceBySubjectAsync(
        int subjectId, DateOnly date)
    {
        return await _context.StudentSubjects
            .Where(ss => ss.SubjectId == subjectId)
            .Select(ss => new AttendanceResponseDto
            {
                StudentId = ss.Student.Id,
                StudentName = ss.Student.Name,

                IsPresent = _context.Attendances.Any(a =>
                    a.StudentId == ss.StudentId &&
                    a.SubjectId == subjectId &&
                    a.Date == date &&
                    a.IsPresent)
            })
            .ToListAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
