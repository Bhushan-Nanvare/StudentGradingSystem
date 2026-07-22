using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs.Dashboard;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Repositories;

public class DashboardRepository : IDashboardRepository
{
    private readonly AppDbContext _context;

    public DashboardRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardStatsDto> GetDashboardStatistics()
    {
        int studentCount = await _context.Students.CountAsync(s => !s.IsDeleted);
        int facultyCount = await _context.Faculties.CountAsync();
        int departmentCount = await _context.Departments.CountAsync();
        int subjectCount = await _context.Subjects.CountAsync(s => !s.IsDeleted);
        int assignmentCount = await _context.Assignments.CountAsync();

        // Attendance stats
        int totalAttendance = await _context.Attendances.CountAsync();
        int presentCount = await _context.Attendances.CountAsync(a => a.IsPresent);
        int absentCount = totalAttendance - presentCount;
        double attendancePct = totalAttendance > 0 ? (presentCount * 100.0 / totalAttendance) : 0;

        var attendanceStats = new AttendanceStatsDto
        {
            TotalRecords = totalAttendance,
            PresentCount = presentCount,
            AbsentCount = absentCount,
            OverallAttendancePercentage = Math.Round(attendancePct, 2)
        };

        // Marks stats
        int marksCount = await _context.Marks.CountAsync();
        double avgMarks = 0;
        double maxMarks = 0;
        double minMarks = 0;

        if (marksCount > 0)
        {
            avgMarks = (double)await _context.Marks.AverageAsync(m => m.MarksObtained);
            maxMarks = (double)await _context.Marks.MaxAsync(m => m.MarksObtained);
            minMarks = (double)await _context.Marks.MinAsync(m => m.MarksObtained);
        }

        var marksStats = new MarksStatsDto
        {
            TotalMarksEntries = marksCount,
            AverageMarks = Math.Round(avgMarks, 2),
            HighestMarks = Math.Round(maxMarks, 2),
            LowestMarks = Math.Round(minMarks, 2)
        };

        // Recent activity
        var activities = new List<RecentActivityDto>();

        var recentAssignments = await _context.Assignments
            .OrderByDescending(a => a.CreatedAt)
            .Take(3)
            .Select(a => new RecentActivityDto
            {
                ActivityType = "Assignment Created",
                Description = $"Assignment '{a.Title}' was created.",
                Timestamp = a.CreatedAt
            })
            .ToListAsync();
        activities.AddRange(recentAssignments);

        var recentStudents = await _context.Students
            .Where(s => !s.IsDeleted)
            .OrderByDescending(s => s.CreatedAt)
            .Take(3)
            .Select(s => new RecentActivityDto
            {
                ActivityType = "Student Added",
                Description = $"Student '{s.Name}' ({s.RollNumber}) was added.",
                Timestamp = s.CreatedAt
            })
            .ToListAsync();
        activities.AddRange(recentStudents);

        var sortedActivities = activities
            .OrderByDescending(a => a.Timestamp)
            .Take(5)
            .ToList();

        return new DashboardStatsDto
        {
            StudentCount = studentCount,
            FacultyCount = facultyCount,
            DepartmentCount = departmentCount,
            SubjectCount = subjectCount,
            AssignmentCount = assignmentCount,
            AttendanceStats = attendanceStats,
            MarksStats = marksStats,
            RecentActivities = sortedActivities
        };
    }
}