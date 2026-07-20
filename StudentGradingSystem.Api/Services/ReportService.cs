using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.Reports;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Services;

public class ReportService : IReportService
{
    private readonly AppDbContext _context;

    public ReportService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<StudentReportDto>> GetSubjectReport(int subjectId)
    {
        var students = await _context.StudentSubjects
            .Where(x => x.SubjectId == subjectId)
            .Include(x => x.Student)
            .Select(x => x.Student)
            .Distinct()
            .ToListAsync();

        var report = new List<StudentReportDto>();

        foreach (var student in students)
        {
            var attendance = await _context.Attendances
                .Where(a =>
                    a.StudentId == student.Id &&
                    a.SubjectId == subjectId)
                .ToListAsync();

            decimal attendancePercentage = 0;

            if (attendance.Any())
            {
                attendancePercentage =
                    attendance.Count(a => a.IsPresent)
                    * 100m
                    / attendance.Count;
            }

            decimal cia1 = await _context.Marks
                .Where(m =>
                    m.StudentId == student.Id &&
                    m.SubjectId == subjectId &&
                    m.AssessmentType == "CIA1")
                .Select(m => m.MarksObtained)
                .FirstOrDefaultAsync();

            decimal cia2 = await _context.Marks
                .Where(m =>
                    m.StudentId == student.Id &&
                    m.SubjectId == subjectId &&
                    m.AssessmentType == "CIA2")
                .Select(m => m.MarksObtained)
                .FirstOrDefaultAsync();

            decimal assignment = await _context.Assignments
                .Where(a =>
                    a.SubjectId == subjectId)
                .AnyAsync()
                    ? cia1 * 0
                    : 0;

            report.Add(new StudentReportDto
            {
                StudentId = student.Id,
                StudentName = student.Name,
                AttendancePercentage = attendancePercentage,
                CIA1 = cia1,
                CIA2 = cia2,
                Assignment = assignment,
                Total = cia1 + cia2 + assignment
            });
        }

        return report;
    }
}