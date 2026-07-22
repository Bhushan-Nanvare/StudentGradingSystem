using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.Reports;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Repositories;

public class ReportRepository : IReportRepository
{
    private readonly AppDbContext _context;

    public ReportRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<int>> GetStudentIdsBySubjectAsync(int subjectId)
    {
        return await _context.StudentSubjects
            .Where(x => x.SubjectId == subjectId)
            .Select(x => x.StudentId)
            .Distinct()
            .ToListAsync();
    }

    public async Task<string> GetStudentNameAsync(int studentId)
    {
        var student = await _context.Students
            .FirstOrDefaultAsync(s => s.Id == studentId);

        return student?.Name ?? string.Empty;
    }

    public async Task<List<Attendance>> GetAttendanceAsync(
        int studentId, int subjectId)
    {
        return await _context.Attendances
            .Where(a =>
                a.StudentId == studentId &&
                a.SubjectId == subjectId)
            .ToListAsync();
    }

    public async Task<decimal> GetMarkAsync(
        int studentId, int subjectId, string assessmentType)
    {
        return await _context.Marks
            .Where(m =>
                m.StudentId == studentId &&
                m.SubjectId == subjectId &&
                m.AssessmentType == assessmentType)
            .Select(m => m.MarksObtained)
            .FirstOrDefaultAsync();
    }

    public async Task<decimal> GetAssignmentMarkAsync(int studentId, int subjectId)
    {
        var marks = await _context.AssignmentSubmissions
            .Where(s => s.StudentId == studentId && s.Assignment.SubjectId == subjectId && s.Marks.HasValue)
            .Select(s => s.Marks!.Value)
            .ToListAsync();

        return marks.Count > 0 ? marks.Average() : 0m;
    }

    public async Task<bool> AnyAssignmentsBySubjectAsync(int subjectId)
    {
        return await _context.Assignments
            .Where(a => a.SubjectId == subjectId)
            .AnyAsync();
    }

    public async Task<List<FacultyReportDto>> GetFacultyReportsAsync()
    {
        return await _context.Faculties
            .Include(f => f.Department)
            .Include(f => f.Subjects)
            .Select(f => new FacultyReportDto
            {
                FacultyId = f.Id,
                EmployeeCode = f.EmployeeCode,
                FacultyName = $"{f.FirstName} {f.LastName}",
                DepartmentName = f.Department != null ? f.Department.Name : string.Empty,
                Designation = f.Designation,
                AssignedSubjectsCount = f.Subjects.Count,
                TotalStudentsTaught = _context.StudentSubjects
                    .Where(ss => f.Subjects.Select(s => s.Id).Contains(ss.SubjectId))
                    .Select(ss => ss.StudentId)
                    .Distinct()
                    .Count()
            })
            .ToListAsync();
    }

    public async Task<List<DepartmentReportDto>> GetDepartmentReportsAsync()
    {
        return await _context.Departments
            .Select(d => new DepartmentReportDto
            {
                DepartmentId = d.Id,
                DepartmentName = d.Name,
                StudentCount = _context.Students.Count(s => s.DepartmentId == d.Id && !s.IsDeleted),
                FacultyCount = _context.Faculties.Count(f => f.DepartmentId == d.Id),
                SubjectCount = _context.Subjects.Count(s => s.DepartmentId == d.Id && !s.IsDeleted),
                AverageCGPA = _context.Students
                    .Where(s => s.DepartmentId == d.Id && !s.IsDeleted)
                    .Select(s => (double?)s.CGPA)
                    .Average() ?? 0
            })
            .ToListAsync();
    }

    public async Task<List<AttendanceReportDto>> GetAttendanceReportsAsync()
    {
        return await _context.Subjects
            .Where(s => !s.IsDeleted)
            .Select(s => new AttendanceReportDto
            {
                SubjectId = s.Id,
                SubjectCode = s.SubjectCode,
                SubjectName = s.Name,
                TotalClassesConducted = _context.Attendances
                    .Where(a => a.SubjectId == s.Id)
                    .Select(a => a.Date)
                    .Distinct()
                    .Count(),
                TotalPresentRecords = _context.Attendances
                    .Count(a => a.SubjectId == s.Id && a.IsPresent),
                TotalAbsentRecords = _context.Attendances
                    .Count(a => a.SubjectId == s.Id && !a.IsPresent),
                AverageAttendancePercentage = _context.Attendances.Any(a => a.SubjectId == s.Id)
                    ? (_context.Attendances.Count(a => a.SubjectId == s.Id && a.IsPresent) * 100.0 / _context.Attendances.Count(a => a.SubjectId == s.Id))
                    : 0
            })
            .ToListAsync();
    }

    public async Task<List<MarksReportDto>> GetMarksReportsAsync()
    {
        return await _context.Marks
            .GroupBy(m => new { m.SubjectId, m.Subject.Name, m.AssessmentType })
            .Select(g => new MarksReportDto
            {
                SubjectId = g.Key.SubjectId,
                SubjectName = g.Key.Name,
                AssessmentType = g.Key.AssessmentType,
                StudentsGraded = g.Count(),
                AverageMarks = g.Average(x => x.MarksObtained),
                HighestMarks = g.Max(x => x.MarksObtained),
                LowestMarks = g.Min(x => x.MarksObtained)
            })
            .ToListAsync();
    }

    public async Task<List<SubjectReportDto>> GetSubjectReportsAsync()
    {
        return await _context.Subjects
            .Where(s => !s.IsDeleted)
            .Select(s => new SubjectReportDto
            {
                SubjectId = s.Id,
                SubjectCode = s.SubjectCode,
                SubjectName = s.Name,
                DepartmentName = s.Department.Name,
                FacultyName = s.Faculty != null ? $"{s.Faculty.FirstName} {s.Faculty.LastName}" : "Unassigned",
                Credits = s.Credits,
                Semester = s.Semester,
                EnrolledStudentsCount = _context.StudentSubjects.Count(ss => ss.SubjectId == s.Id),
                AverageMarks = _context.Marks.Any(m => m.SubjectId == s.Id)
                    ? _context.Marks.Where(m => m.SubjectId == s.Id).Average(m => m.MarksObtained)
                    : 0m
            })
            .ToListAsync();
    }
}
