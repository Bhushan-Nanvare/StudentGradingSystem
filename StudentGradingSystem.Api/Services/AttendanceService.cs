using StudentGradingSystem.Api.DTOs.Attendance;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Services;

public class AttendanceService : IAttendanceService
{
    private readonly IAttendanceRepository _attendanceRepository;
    private readonly IFacultyRepository _facultyRepository;

    public AttendanceService(
        IAttendanceRepository attendanceRepository,
        IFacultyRepository facultyRepository)
    {
        _attendanceRepository = attendanceRepository;
        _facultyRepository = facultyRepository;
    }

    public async Task MarkAttendance(
        int facultyUserId,
        MarkAttendanceDto dto)
    {
        var faculty = await _facultyRepository
            .GetFacultyByApplicationUserIdAsync(facultyUserId);

        if (faculty == null)
            return;

        foreach (var student in dto.Students)
        {
            var existingAttendance =
                await _attendanceRepository.GetExistingAttendanceAsync(
                    student.StudentId, dto.SubjectId, dto.Date);

            if (existingAttendance != null)
            {
                existingAttendance.IsPresent =
                    student.IsPresent;
            }
            else
            {
                await _attendanceRepository.AddAttendanceAsync(
                    new Attendance
                    {
                        StudentId = student.StudentId,
                        SubjectId = dto.SubjectId,
                        FacultyId = faculty.Id,
                        Date = dto.Date,
                        IsPresent = student.IsPresent
                    });
            }
        }

        await _attendanceRepository.SaveChangesAsync();
    }

    public async Task<List<AttendanceResponseDto>>
        GetAttendance(int subjectId, DateOnly date)
    {
        return await _attendanceRepository
            .GetAttendanceBySubjectAsync(subjectId, date);
    }
}