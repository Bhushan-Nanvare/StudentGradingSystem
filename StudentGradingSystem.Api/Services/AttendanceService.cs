using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.Attendance;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Services;

public class AttendanceService : IAttendanceService
{
    private readonly AppDbContext _context;

    public AttendanceService(AppDbContext context)
    {
        _context = context;
    }

    public async Task MarkAttendance(
        int facultyUserId,
        MarkAttendanceDto dto)
    {
        var faculty = await _context.Faculties
            .FirstOrDefaultAsync(f =>
                f.ApplicationUserId == facultyUserId);

        if (faculty == null)
            return;

        var today = DateOnly.FromDateTime(DateTime.UtcNow);

        foreach (var student in dto.Students)
        {
            var existingAttendance =
                await _context.Attendances
                    .FirstOrDefaultAsync(a =>
                        a.StudentId == student.StudentId &&
                        a.SubjectId == dto.SubjectId &&
                        a.Date == today);

            if (existingAttendance != null)
            {
                existingAttendance.IsPresent =
                    student.IsPresent;
            }
            else
            {
                _context.Attendances.Add(new Attendance
                {
                    StudentId = student.StudentId,
                    SubjectId = dto.SubjectId,
                    FacultyId = faculty.Id,
                    Date = today,
                    IsPresent = student.IsPresent
                });
            }
        }

        await _context.SaveChangesAsync();
    }

    public async Task<List<AttendanceResponseDto>>
        GetAttendance(int subjectId)
    {
        var today = DateOnly.FromDateTime(DateTime.UtcNow);

        return await _context.StudentSubjects
            .Where(ss => ss.SubjectId == subjectId)
            .Select(ss => new AttendanceResponseDto
            {
                StudentId = ss.Student.Id,
                StudentName = ss.Student.Name,

                IsPresent = _context.Attendances.Any(a =>
                    a.StudentId == ss.StudentId &&
                    a.SubjectId == subjectId &&
                    a.Date == today &&
                    a.IsPresent)
            })
            .ToListAsync();
    }
}