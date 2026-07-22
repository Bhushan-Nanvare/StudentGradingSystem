using StudentGradingSystem.Api.DTOs.StudentPortal;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Services;

public class StudentPortalService : IStudentPortalService
{
    private readonly IStudentPortalRepository _repository;

    public StudentPortalService(IStudentPortalRepository repository)
    {
        _repository = repository;
    }

    public async Task<StudentDashboardDto> GetDashboard(int applicationUserId)
    {
        var student = await _repository
            .GetStudentWithDetailsAsync(applicationUserId);

        if (student == null)
            throw new Exception("Student not found.");

        int totalSubjects = student.StudentSubjects.Count;

        var attendance = await _repository
            .GetAllAttendanceForStudentAsync(student.Id);

        double attendancePercentage = 0;

        if (attendance.Count > 0)
        {
            attendancePercentage =
                attendance.Count(x => x.IsPresent) * 100.0 /
                attendance.Count;
        }

        int pendingAssignments =
            await _repository.GetPendingAssignmentsCountAsync(student.Id);

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
        var student = await _repository
            .GetStudentByApplicationUserIdAsync(applicationUserId);

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
        var student = await _repository
            .GetStudentByApplicationUserIdAsync(applicationUserId);

        if (student == null)
            throw new Exception("Student not found.");

        return await _repository.GetSubjectsAsync(student.Id);
    }

    public async Task<List<StudentAttendanceDto>> GetAttendance(int applicationUserId)
    {
        var student = await _repository
            .GetStudentByApplicationUserIdAsync(applicationUserId);

        if (student == null)
            throw new Exception("Student not found.");

        return await _repository.GetAttendanceAsync(student.Id);
    }

    public async Task<List<StudentMarkDto>> GetMarks(int applicationUserId)
    {
        var student = await _repository
            .GetStudentByApplicationUserIdAsync(applicationUserId);

        if (student == null)
            throw new Exception("Student not found.");

        return await _repository.GetMarksAsync(student.Id);
    }

    public async Task<List<StudentAssignmentDto>> GetAssignments(int applicationUserId)
    {
        var student = await _repository
            .GetStudentByApplicationUserIdAsync(applicationUserId);

        if (student == null)
            throw new Exception("Student not found.");

        return await _repository.GetAssignmentsAsync(student.Id);
    }
}