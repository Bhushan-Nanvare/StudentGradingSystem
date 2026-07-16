using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.Attendance;
using StudentGradingSystem.Api.Interfaces;
using Microsoft.EntityFrameworkCore;
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
        {
            return;
        }

        var existingAttendance = await _context.Attendances
            .FirstOrDefaultAsync(a =>
                a.StudentId == dto.StudentId &&
                a.SubjectId == dto.SubjectId &&
                a.Date == DateOnly.FromDateTime(DateTime.UtcNow));

        if (existingAttendance != null)
        {
            existingAttendance.IsPresent = dto.IsPresent;

            await _context.SaveChangesAsync();

            return;
        }

        var attendance = new Attendance
        {
            StudentId = dto.StudentId,
            SubjectId = dto.SubjectId,
            FacultyId = faculty.Id,
            Date = DateOnly.FromDateTime(DateTime.UtcNow),
            IsPresent = dto.IsPresent
        };

        _context.Attendances.Add(attendance);

        await _context.SaveChangesAsync();
    }

    public async Task<List<AttendanceResponseDto>>
        GetAttendance(
            int subjectId,
            DateOnly date)
    {
        return await _context.Attendances
            .Where(a =>
                a.SubjectId == subjectId &&
                a.Date == date)
            .Select(a => new AttendanceResponseDto
            {
                StudentId = a.StudentId,
                StudentName = a.Student.Name,
                IsPresent = a.IsPresent,
                Date = a.Date
            })
            .ToListAsync();
    }
}