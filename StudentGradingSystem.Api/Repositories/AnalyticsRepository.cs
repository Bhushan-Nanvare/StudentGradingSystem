using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.Analytics;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Repositories;

public class AnalyticsRepository : IAnalyticsRepository
{
    private readonly AppDbContext _context;

    public AnalyticsRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<OverallAnalyticsDto> GetOverallAnalyticsAsync()
    {
        int totalStudents = await _context.Students.CountAsync(s => !s.IsDeleted);
        int totalSubjects = await _context.Subjects.CountAsync(s => !s.IsDeleted);

        int totalAttendance = await _context.Attendances.CountAsync();
        int presentAttendance = await _context.Attendances.CountAsync(a => a.IsPresent);
        double attendancePct = totalAttendance > 0 ? (presentAttendance * 100.0 / totalAttendance) : 0;

        int marksCount = await _context.Marks.CountAsync();
        double avgMarks = 0;
        double maxMarks = 0;
        double minMarks = 0;
        double passPct = 0;

        if (marksCount > 0)
        {
            avgMarks = (double)await _context.Marks.AverageAsync(m => m.MarksObtained);
            maxMarks = (double)await _context.Marks.MaxAsync(m => m.MarksObtained);
            minMarks = (double)await _context.Marks.MinAsync(m => m.MarksObtained);

            int passingCount = await _context.Marks.CountAsync(m => m.MaxMarks > 0 && (m.MarksObtained / m.MaxMarks) >= 0.4m);
            passPct = (passingCount * 100.0 / marksCount);
        }

        return new OverallAnalyticsDto
        {
            OverallAttendancePercentage = Math.Round(attendancePct, 2),
            AverageMarks = Math.Round(avgMarks, 2),
            HighestMarks = Math.Round(maxMarks, 2),
            LowestMarks = Math.Round(minMarks, 2),
            PassPercentage = Math.Round(passPct, 2),
            TotalStudents = totalStudents,
            TotalSubjects = totalSubjects
        };
    }

    public async Task<List<DepartmentAnalyticsDto>> GetDepartmentAnalyticsAsync()
    {
        var departments = await _context.Departments.ToListAsync();
        var result = new List<DepartmentAnalyticsDto>();

        foreach (var dept in departments)
        {
            var students = await _context.Students
                .Where(s => s.DepartmentId == dept.Id && !s.IsDeleted)
                .ToListAsync();

            int studentCount = students.Count;
            double avgCGPA = studentCount > 0 ? students.Average(s => s.CGPA) : 0;

            var studentIds = students.Select(s => s.Id).ToList();

            var deptAttendances = await _context.Attendances
                .Where(a => studentIds.Contains(a.StudentId))
                .ToListAsync();

            double attendancePct = deptAttendances.Count > 0
                ? (deptAttendances.Count(a => a.IsPresent) * 100.0 / deptAttendances.Count)
                : 0;

            var deptMarks = await _context.Marks
                .Where(m => studentIds.Contains(m.StudentId))
                .ToListAsync();

            double passPct = deptMarks.Count > 0
                ? (deptMarks.Count(m => m.MaxMarks > 0 && (m.MarksObtained / m.MaxMarks) >= 0.4m) * 100.0 / deptMarks.Count)
                : 0;

            result.Add(new DepartmentAnalyticsDto
            {
                DepartmentId = dept.Id,
                DepartmentName = dept.Name,
                TotalStudents = studentCount,
                AverageCGPA = Math.Round(avgCGPA, 2),
                AttendancePercentage = Math.Round(attendancePct, 2),
                PassPercentage = Math.Round(passPct, 2)
            });
        }

        return result;
    }

    public async Task<List<SubjectAnalyticsDto>> GetSubjectAnalyticsAsync()
    {
        var subjects = await _context.Subjects
            .Where(s => !s.IsDeleted)
            .ToListAsync();

        var result = new List<SubjectAnalyticsDto>();

        foreach (var subject in subjects)
        {
            int enrolledCount = await _context.StudentSubjects
                .CountAsync(ss => ss.SubjectId == subject.Id);

            var marks = await _context.Marks
                .Where(m => m.SubjectId == subject.Id)
                .ToListAsync();

            double avgMarks = marks.Count > 0 ? (double)marks.Average(m => m.MarksObtained) : 0;
            double maxMarks = marks.Count > 0 ? (double)marks.Max(m => m.MarksObtained) : 0;
            double minMarks = marks.Count > 0 ? (double)marks.Min(m => m.MarksObtained) : 0;
            double passPct = marks.Count > 0
                ? (marks.Count(m => m.MaxMarks > 0 && (m.MarksObtained / m.MaxMarks) >= 0.4m) * 100.0 / marks.Count)
                : 0;

            var attendances = await _context.Attendances
                .Where(a => a.SubjectId == subject.Id)
                .ToListAsync();

            double attendancePct = attendances.Count > 0
                ? (attendances.Count(a => a.IsPresent) * 100.0 / attendances.Count)
                : 0;

            result.Add(new SubjectAnalyticsDto
            {
                SubjectId = subject.Id,
                SubjectCode = subject.SubjectCode,
                SubjectName = subject.Name,
                EnrolledStudents = enrolledCount,
                AverageMarks = Math.Round(avgMarks, 2),
                HighestMarks = Math.Round(maxMarks, 2),
                LowestMarks = Math.Round(minMarks, 2),
                AttendancePercentage = Math.Round(attendancePct, 2),
                PassPercentage = Math.Round(passPct, 2)
            });
        }

        return result;
    }
}
