using StudentGradingSystem.Api.DTOs.Attendance;
using StudentGradingSystem.Api.DTOs.Assignment;
using StudentGradingSystem.Api.DTOs.AssignmentSubmission;
using StudentGradingSystem.Api.DTOs.FacultyPortal;
using StudentGradingSystem.Api.DTOs.Marks;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Services;

public class FacultyPortalService : IFacultyPortalService
{
    private readonly IFacultyRepository _facultyRepository;
    private readonly ISubjectRepository _subjectRepository;
    private readonly IAttendanceRepository _attendanceRepository;
    private readonly IMarkRepository _markRepository;
    private readonly IAssignmentRepository _assignmentRepository;
    private readonly IAssignmentSubmissionRepository _submissionRepository;

    public FacultyPortalService(
        IFacultyRepository facultyRepository,
        ISubjectRepository subjectRepository,
        IAttendanceRepository attendanceRepository,
        IMarkRepository markRepository,
        IAssignmentRepository assignmentRepository,
        IAssignmentSubmissionRepository submissionRepository)
    {
        _facultyRepository = facultyRepository;
        _subjectRepository = subjectRepository;
        _attendanceRepository = attendanceRepository;
        _markRepository = markRepository;
        _assignmentRepository = assignmentRepository;
        _submissionRepository = submissionRepository;
    }

    public async Task<FacultyDashboardDto> GetDashboard(int userId)
    {
        var faculty = await _facultyRepository.GetFacultyByApplicationUserIdAsync(userId);
        if (faculty == null)
        {
            return new FacultyDashboardDto();
        }

        var subjects = await _subjectRepository.GetSubjectsByFacultyIdAsync(faculty.Id);
        int totalStudents = 0;
        int totalAssignments = 0;

        foreach (var subject in subjects)
        {
            var enrolled = await _subjectRepository.GetEnrolledStudentsAsync(subject.Id);
            totalStudents += enrolled.Count;

            var assignments = await _assignmentRepository.GetAssignmentsBySubjectAsync(subject.Id);
            totalAssignments += assignments.Count;
        }

        return new FacultyDashboardDto
        {
            FacultyName = $"{faculty.FirstName} {faculty.LastName}",
            EmployeeCode = faculty.EmployeeCode,
            Department = faculty.Department?.Name ?? string.Empty,
            Designation = faculty.Designation,
            TotalSubjects = subjects.Count,
            TotalStudents = totalStudents,
            TotalAssignments = totalAssignments
        };
    }

    public async Task<List<FacultySubjectDto>> GetMySubjects(int userId)
    {
        var faculty = await _facultyRepository
            .GetFacultyByApplicationUserIdAsync(userId);

        if (faculty == null)
        {
            return new List<FacultySubjectDto>();
        }

        var subjects = await _subjectRepository
            .GetSubjectsByFacultyIdAsync(faculty.Id);

        return subjects.Select(s => new FacultySubjectDto
        {
            Id = s.Id,
            SubjectCode = s.SubjectCode,
            Name = s.Name,
            Credits = s.Credits,
            Semester = s.Semester,
            DepartmentName = s.Department?.Name ?? string.Empty
        }).ToList();
    }

    public async Task<List<FacultyStudentDto>> GetStudentsBySubject(int subjectId)
    {
        return await _subjectRepository.GetStudentsBySubjectIdAsync(subjectId);
    }

    public async Task<List<AttendanceResponseDto>> GetAttendanceBySubject(int subjectId, DateOnly date)
    {
        return await _attendanceRepository.GetAttendanceBySubjectAsync(subjectId, date);
    }

    public async Task<List<MarkResponseDto>> GetMarksBySubject(int subjectId, string assessmentType)
    {
        return await _markRepository.GetMarksBySubjectAsync(subjectId, assessmentType);
    }

    public async Task<List<AssignmentResponseDto>> GetAssignmentsBySubject(int subjectId)
    {
        return await _assignmentRepository.GetAssignmentsBySubjectAsync(subjectId);
    }

    public async Task<List<AssignmentSubmissionDto>> GetSubmissionsByAssignment(int assignmentId)
    {
        return await _submissionRepository.GetByAssignmentAsync(assignmentId);
    }
}
