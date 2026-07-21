using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.StudentPortal;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Services;

public class StudentPortalService : IStudentPortalService
{
    private readonly AppDbContext _context;

    public StudentPortalService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<StudentDashboardDto> GetDashboard(int applicationUserId)
    {
        var student = await _context.Students
            .Include(x => x.Department)
            .Include(x => x.StudentSubjects)
            .Include(x => x.ApplicationUser)
            .FirstOrDefaultAsync(x => x.ApplicationUserId == applicationUserId);

        if (student == null)
            throw new Exception("Student not found.");

        int totalSubjects = student.StudentSubjects.Count;

        var attendance = await _context.Attendances
            .Where(x => x.StudentId == student.Id)
            .ToListAsync();

        double attendancePercentage = 0;

        if (attendance.Count > 0)
        {
            attendancePercentage =
                attendance.Count(x => x.IsPresent) * 100.0 /
                attendance.Count;
        }

        int pendingAssignments =
            await _context.Assignments.CountAsync(a =>
                !_context.AssignmentSubmissions.Any(s =>
                    s.AssignmentId == a.Id &&
                    s.StudentId == student.Id));

        return new StudentDashboardDto
        {
            StudentName = student.Name,
            RollNumber = student.RollNumber,
            Department = student.Department.Name,
            CGPA = student.CGPA,
            TotalSubjects = totalSubjects,
            AttendancePercentage = Math.Round(attendancePercentage, 2),
            PendingAssignments = pendingAssignments
        };
    }

    public async Task<StudentProfileDto?> GetProfile(int applicationUserId)
    {
        var student = await _context.Students
            .Include(x => x.Department)
            .Include(x => x.ApplicationUser)
            .FirstOrDefaultAsync(x => x.ApplicationUserId == applicationUserId);

        if (student == null)
            return null;

        return new StudentProfileDto
        {
            Id = student.Id,
            Name = student.Name,
            RollNumber = student.RollNumber,
            Email = student.ApplicationUser?.Email ?? string.Empty,
            Age = student.Age,
            CGPA = student.CGPA,
            Department = student.Department.Name
        };
    }

    public async Task<List<StudentSubjectDto>> GetSubjects(int applicationUserId)
    {
        var student = await _context.Students
            .FirstOrDefaultAsync(x => x.ApplicationUserId == applicationUserId);

        if (student == null)
            throw new Exception("Student not found.");

        return await _context.StudentSubjects
            .Where(x => x.StudentId == student.Id)
            .Select(x => new StudentSubjectDto
            {
                Id = x.Subject.Id,
                SubjectCode = x.Subject.SubjectCode,
                SubjectName = x.Subject.Name,
                Credits = x.Subject.Credits,
                Semester = x.Subject.Semester,
                Faculty = x.Subject.Faculty.FirstName + " " + x.Subject.Faculty.LastName
            })
            .ToListAsync();
    }

    public async Task<List<StudentAttendanceDto>> GetAttendance(int applicationUserId)
    {
        var student = await _context.Students
            .FirstOrDefaultAsync(x => x.ApplicationUserId == applicationUserId);

        if (student == null)
            throw new Exception("Student not found.");

        return await _context.Attendances
            .Where(x => x.StudentId == student.Id)
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

    public async Task<List<StudentMarkDto>> GetMarks(int applicationUserId)
    {
        var student = await _context.Students
            .FirstOrDefaultAsync(x => x.ApplicationUserId == applicationUserId);

        if (student == null)
            throw new Exception("Student not found.");

        return await _context.Marks
            .Where(x => x.StudentId == student.Id)
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

    public async Task<List<StudentAssignmentDto>> GetAssignments(int applicationUserId)
    {
        var student = await _context.Students
            .FirstOrDefaultAsync(x => x.ApplicationUserId == applicationUserId);

        if (student == null)
            throw new Exception("Student not found.");

        return await _context.Assignments
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
                    s.StudentId == student.Id),

                MarksObtained = _context.AssignmentSubmissions
                    .Where(s =>
                        s.AssignmentId == a.Id &&
                        s.StudentId == student.Id)
                    .Select(s => s.Marks)
                    .FirstOrDefault()
            })
            .ToListAsync();
    }
}