using StudentGradingSystem.Api.DTOs.Assignment;

namespace StudentGradingSystem.Api.Services.Interfaces;


public interface IAssignmentService
{
    Task CreateAssignment(int facultyUserId, CreateAssignmentDto dto);

    Task<List<AssignmentResponseDto>> GetAssignments(int subjectId);

    Task UpdateAssignment(
        int id,
        int facultyUserId,
        UpdateAssignmentDto dto);

    Task DeleteAssignment(
        int id,
        int facultyUserId);
}