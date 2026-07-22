using StudentGradingSystem.Api.DTOs.Assignment;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Services.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Services;

public class AssignmentService : IAssignmentService
{
    private readonly IAssignmentRepository _assignmentRepository;
    private readonly IFacultyRepository _facultyRepository;

    public AssignmentService(
        IAssignmentRepository assignmentRepository,
        IFacultyRepository facultyRepository)
    {
        _assignmentRepository = assignmentRepository;
        _facultyRepository = facultyRepository;
    }

    public async Task CreateAssignment(
        int facultyUserId,
        CreateAssignmentDto dto)
    {
        var faculty = await _facultyRepository
            .GetFacultyByApplicationUserIdAsync(facultyUserId);

        if (faculty == null)
            throw new Exception("Faculty not found.");

        var assignment = new Assignment
        {
            Title = dto.Title,
            Description = dto.Description,
            SubjectId = dto.SubjectId,
            FacultyId = faculty.Id,
            DueDate = dto.DueDate,
            MaxMarks = dto.MaxMarks
        };

        await _assignmentRepository.AddAssignmentAsync(assignment);
    }

    public async Task<List<AssignmentResponseDto>> GetAssignments(
        int subjectId)
    {
        return await _assignmentRepository
            .GetAssignmentsBySubjectAsync(subjectId);
    }

    public async Task UpdateAssignment(
        int id,
        int facultyUserId,
        UpdateAssignmentDto dto)
    {
        var faculty = await _facultyRepository
            .GetFacultyByApplicationUserIdAsync(facultyUserId);

        if (faculty == null)
            throw new Exception("Faculty not found.");

        var assignment = await _assignmentRepository
            .GetAssignmentByIdAndFacultyAsync(id, faculty.Id);

        if (assignment == null)
            throw new Exception("Assignment not found.");

        assignment.Title = dto.Title;
        assignment.Description = dto.Description;
        assignment.DueDate = dto.DueDate;
        assignment.MaxMarks = dto.MaxMarks;

        await _assignmentRepository.SaveChangesAsync();
    }

    public async Task DeleteAssignment(
        int id,
        int facultyUserId)
    {
        var faculty = await _facultyRepository
            .GetFacultyByApplicationUserIdAsync(facultyUserId);

        if (faculty == null)
            throw new Exception("Faculty not found.");

        var assignment = await _assignmentRepository
            .GetAssignmentByIdAndFacultyAsync(id, faculty.Id);

        if (assignment == null)
            throw new Exception("Assignment not found.");

        await _assignmentRepository.RemoveAssignmentAsync(assignment);
    }
}